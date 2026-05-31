import { CastList } from '@/components/media/CastList';
import { DeleteModal } from '@/components/media/DeleteModal';
import { MediaActions } from '@/components/media/MediaActions';
import { MediaBackdrop } from '@/components/media/MediaBackdrop';
import { MediaHeader } from '@/components/media/MediaHeader';
import { MediaInfoGrid } from '@/components/media/MediaInfoGrid';
import { RatingCard } from '@/components/media/RatingCard';
import { ReviewModal } from '@/components/media/ReviewModal';
import { TrailerPlayer } from '@/components/media/TrailerPlayer';
import { MediaDetail } from '@/types/media';
import Storage from '@/utils/storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function SeriesDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<MediaDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [review, setReview] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchDetail(); }, []);

  async function getToken() {
    return await Storage.get('token');
  }

  async function fetchDetail() {
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/media/tv/${id}`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      const json: MediaDetail = await res.json();
      setData(json);
      setUserRating(json.userData?.user_rating ?? 0);
      setReview(json.userData?.review ?? '');
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar a série.');
    } finally {
      setLoading(false);
    }
  }

  async function handleAddToCollection() {
    if (!data) return;
    const token = await getToken();
    const res = await fetch(`${API_URL}/movies/store-from-api`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ tmdb_id: id, title: data.title, poster: data.poster, media_type: 'tv' }),
    });
    if (res.ok) { Alert.alert('Sucesso', 'Série adicionada à coleção!'); fetchDetail(); }
    else { const err = await res.json(); Alert.alert('Aviso', err.message ?? 'Erro ao adicionar.'); }
  }

  async function handleToggleFavorite() {
    if (!data?.userData) return;
    const token = await getToken();
    await fetch(`${API_URL}/movies/${data.userData.id}/favorite`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    });
    fetchDetail();
  }

  async function handleSaveReview() {
    if (!data) return;
    setSaving(true);
    const token = await getToken();
    const res = await fetch(`${API_URL}/movies/save-or-update`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ tmdb_id: id, title: data.title, poster: data.poster, media_type: 'tv', user_rating: userRating, review }),
    });
    setSaving(false);
    if (res.ok) { setModalVisible(false); fetchDetail(); }
    else Alert.alert('Erro', 'Não foi possível salvar a avaliação.');
  }

  async function handleDelete() {
    if (!data?.userData) return;
    const token = await getToken();
    await fetch(`${API_URL}/movies/${data.userData.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    });
    setDeleteModalVisible(false);
    router.back();
  }

  if (loading) return <View style={styles.loading}><ActivityIndicator color="#7c3aed" size="large" /></View>;
  if (!data) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView showsVerticalScrollIndicator={false}>
        <MediaBackdrop backdrop={data.backdrop} poster={data.poster} />

        <MediaHeader
          title={data.title}
          poster={data.poster}
          rating={data.rating}
          release={data.release}
          hours={data.hours}
          minutes={data.minutes}
          badge="Série"
        />

        <View style={styles.body}>
          <MediaActions
            userData={data.userData}
            onAddToCollection={handleAddToCollection}
            onToggleFavorite={handleToggleFavorite}
            onEditReview={() => setModalVisible(true)}
            onDelete={() => setDeleteModalVisible(true)}
          />

          <RatingCard userData={data.userData} />

          <MediaInfoGrid
            description={data.description}
            genres={data.genres}
            director={data.director}
            writer={data.writer}
            studios={data.studios}
          />

          <CastList cast={data.cast} />

          <TrailerPlayer videoId={data.trailer} />

          <View style={{ height: 80 }} />
        </View>
      </ScrollView>

      <ReviewModal
        visible={modalVisible}
        rating={userRating}
        review={review}
        saving={saving}
        onChangeRating={setUserRating}
        onChangeReview={setReview}
        onSave={handleSaveReview}
        onClose={() => setModalVisible(false)}
        placeholder="O que você achou da série?"
      />

      <DeleteModal
        visible={deleteModalVisible}
        title={data.title}
        onConfirm={handleDelete}
        onClose={() => setDeleteModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0612' },
  loading: { flex: 1, backgroundColor: '#0a0612', alignItems: 'center', justifyContent: 'center' },
  body: { paddingHorizontal: 20 },
});