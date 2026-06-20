import { CastList } from '@/components/media/CastList';
import { DeleteModal } from '@/components/media/DeleteModal';
import { MediaActions } from '@/components/media/MediaActions';
import { MediaBackdrop } from '@/components/media/MediaBackdrop';
import { MediaHeader } from '@/components/media/MediaHeader';
import { MediaInfoGrid } from '@/components/media/MediaInfoGrid';
import { RatingCard } from '@/components/media/RatingCard';
import { ReviewModal } from '@/components/media/ReviewModal';
import { TrailerPlayer } from '@/components/media/TrailerPlayer';
import { SimilarMedia } from '@/components/media/SimilarMedia';
import { MediaDetail } from '@/types/media';
import { api } from '@/services/api';
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

export default function MovieDetailScreen() {
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

  async function authHeaders() {
    const token = await getToken();
    return { Authorization: `Bearer ${token}` };
  }

  async function fetchDetail() {
    try {
      const { data: json } = await api.get<MediaDetail>(`/media/movie/${id}`, {
        headers: await authHeaders(),
      });
      setData(json);
      setUserRating(json.userData?.user_rating ?? 0);
      setReview(json.userData?.review ?? '');
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar o filme.');
    } finally {
      setLoading(false);
    }
  }

  async function handleAddToCollection() {
    if (!data) return;
    try {
      await api.post('/movies/store-from-api', {
        tmdb_id: id, title: data.title, poster: data.poster, media_type: 'movie',
      }, { headers: await authHeaders() });
      Alert.alert('Sucesso', 'Adicionado à coleção!');
      fetchDetail();
    } catch (error: any) {
      Alert.alert('Aviso', error.response?.data?.message ?? 'Erro ao adicionar.');
    }
  }

  async function handleToggleFavorite() {
    if (!data?.userData) return;
    await api.patch(`/movies/${data.userData.id}/favorite`, {}, {
      headers: await authHeaders(),
    });
    fetchDetail();
  }

  async function handleSaveReview() {
    if (!data) return;
    setSaving(true);
    try {
      await api.post('/movies/save-or-update', {
        tmdb_id: id, title: data.title, poster: data.poster,
        media_type: 'movie', user_rating: userRating, review,
      }, { headers: await authHeaders() });
      setModalVisible(false);
      fetchDetail();
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar a avaliação.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!data?.userData) return;
    await api.delete(`/movies/${data.userData.id}`, {
      headers: await authHeaders(),
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

          <SimilarMedia type="movie" id={id} />

          <View style={{ height: 20 }} />
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