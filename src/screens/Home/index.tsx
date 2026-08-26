import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Switch,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Animated,
  PanResponder,
  BackHandler,
} from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { haversine } from '../../services/location';
import PointCard, { PointCardStatus } from '../../components/PointCard';
import FloatingActionButton from '../../components/FloatingActionButton';
import FloatingActionMenu from '../../components/FloatingActionMenu';
import { styles } from './style';

const logoImg = require('../../images/logos/wayremote-logo.png');
const tabPontosImg = require('../../images/icons/pontos-icon-tab.png');
const tabEquipesImg = require('../../images/icons/equipes-icon-tab.png');
const tabCampanhasImg = require('../../images/icons/campanha-icon-tab.png');
const tabAcoesImg = require('../../images/icons/acoes-icon-tab.png');

// ─── MOCK: remove or set to false to disable ─────────────
const USE_MOCK = true;

const MOCK_ADDRESS = 'Marco, Belém — PA';
const MOCK_REGION = {
  latitude: -1.4378,
  longitude: -48.4602,
  latitudeDelta: 0.04,
  longitudeDelta: 0.04,
};

interface MockPoint {
  id: string;
  name: string;
  address: string;
  category: string;
  members: number;
  rating: number;
  reviews: number;
  visibility: 'PÚBLICO' | 'PRIVADO';
  icon: string;
  color: string;
  latitude: number;
  longitude: number;
  status: PointCardStatus;
}

const MOCK_POINTS: MockPoint[] = [
  {
    id: '1',
    name: 'VIGILÂNCIA SANITÁRIA',
    address: 'R. PadroEU, 123',
    category: 'Saúde',
    members: 28,
    rating: 4.9,
    reviews: 41,
    visibility: 'PÚBLICO',
    icon: 'medical-bag',
    color: '#2d5016',
    latitude: -1.4360,
    longitude: -48.4590,
    status: 'enter',
  },
  {
    id: '2',
    name: 'COMÉRCIO LOCAL MARCO',
    address: 'Av. Nazaré, 456',
    category: 'Comércio',
    members: 15,
    rating: 4.5,
    reviews: 22,
    visibility: 'PÚBLICO',
    icon: 'storefront',
    color: '#7c3f99',
    latitude: -1.4400,
    longitude: -48.4640,
    status: 'member',
  },
  {
    id: '3',
    name: 'BLITZ TRÂNSITO MARCO',
    address: 'Tv. Osvaldo Cruz, 78',
    category: 'Trânsito',
    members: 8,
    rating: 4.1,
    reviews: 12,
    visibility: 'PÚBLICO',
    icon: 'cone',
    color: '#a52a2a',
    latitude: -1.4350,
    longitude: -48.4680,
    status: 'enter',
  },
  {
    id: '4',
    name: 'PROTOCOLO ANIMAIS MARCO',
    address: 'R. do Sol, 910',
    category: 'Animais',
    members: 32,
    rating: 4.8,
    reviews: 56,
    visibility: 'PRIVADO',
    icon: 'paw',
    color: '#8b4513',
    latitude: -1.4420,
    longitude: -48.4580,
    status: 'request',
  },
  {
    id: '5',
    name: 'GRUPO MOTOTÁXI COQUEIRO',
    address: 'Av. Augusto Montenegro, 2000',
    category: 'Transporte',
    members: 45,
    rating: 4.3,
    reviews: 31,
    visibility: 'PÚBLICO',
    icon: 'taxi',
    color: '#c4a000',
    latitude: -1.4320,
    longitude: -48.4450,
    status: 'pending',
  },
  {
    id: '6',
    name: 'EDUCAÇÃO BELÉM CENTRO',
    address: 'R. Batista Campos, 300',
    category: 'Saúde',
    members: 20,
    rating: 4.7,
    reviews: 38,
    visibility: 'PÚBLICO',
    icon: 'school',
    color: '#1a6b3c',
    latitude: -1.4550,
    longitude: -48.4900,
    status: 'enter',
  },
];

const CATEGORIES = [
  { id: 'todas', name: 'Todas', icon: 'apps', color: colors.textSecondary },
  { id: 'Saúde', name: 'Saúde', icon: 'medical-bag', color: '#2d5016' },
  { id: 'Comércio', name: 'Comércio', icon: 'storefront', color: '#7c3f99' },
  { id: 'Trânsito', name: 'Trânsito', icon: 'cone', color: '#a52a2a' },
  { id: 'Animais', name: 'Animais', icon: 'paw', color: '#8b4513' },
  { id: 'Transporte', name: 'Transporte', icon: 'taxi', color: '#c4a000' },
];
// ─── END MOCK ──────────────────────────────────────────

const TABS = [
  { id: 'pontos', label: 'PONTOS', img: tabPontosImg, color: '#a52a2a' },
  { id: 'equipes', label: 'EQUIPES', img: tabEquipesImg, color: '#2d5016' },
  { id: 'campanhas', label: 'CAMPANHAS', img: tabCampanhasImg, color: '#4a2d7d' },
  { id: 'acoes', label: 'AÇÕES', img: tabAcoesImg, color: '#d4a500' },
];

const RADIUS_OPTIONS = [1, 3, 5, 10, 20, 50];
const SLIDER_WIDTH = 200;

const fabItems = [
  { label: 'Convidar Membro', icon: 'person-add' as const, onPress: () => {} },
  { label: 'Criar Grupo', icon: 'people' as const, onPress: () => {} },
  { label: 'Criar Ponto', icon: 'location' as const, onPress: () => {} },
];

export default function HomeScreen() {
  const mapRef = useRef<MapView>(null);
  const fabSpin = useRef(new Animated.Value(0)).current;

  const [fabOpen, setFabOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('pontos');
  const [visibleToOthers, setVisibleToOthers] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // ─── Region (mock or real) ──────────────────────
  const [region] = useState(MOCK_REGION);
  const address = USE_MOCK ? MOCK_ADDRESS : null;
  const loadingLocation = false;

  // ─── Radius slider (ref-based to avoid stale closures) ──
  const DEFAULT_IDX = RADIUS_OPTIONS.indexOf(5);
  const [radiusKm, setRadiusKm] = useState(5);
  const radiusKmIndexRef = useRef(DEFAULT_IDX);
  const [previewRadiusKm, setPreviewRadiusKm] = useState<number | null>(null);
  const trackWidthRef = useRef(SLIDER_WIDTH);
  const thumbX = useRef(new Animated.Value(
    (DEFAULT_IDX / (RADIUS_OPTIONS.length - 1)) * SLIDER_WIDTH,
  )).current;

  const getStepWidth = useCallback(() => {
    const w = trackWidthRef.current;
    return w > 0 ? w / (RADIUS_OPTIONS.length - 1) : SLIDER_WIDTH / (RADIUS_OPTIONS.length - 1);
  }, []);

  // Android back handler for modal
  useEffect(() => {
    if (!showCategoryModal) return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      setShowCategoryModal(false);
      return true;
    });
    return () => sub.remove();
  }, [showCategoryModal]);

  // ─── Filtering ──────────────────────────────────
  const filtered = useMemo(() => {
    const source = USE_MOCK ? MOCK_POINTS : [];
    let result = source;
    if (selectedCategory && selectedCategory !== 'todas') {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (region) {
      const userCoord = { latitude: region.latitude, longitude: region.longitude };
      result = result.filter((p) => {
        const d = haversine(userCoord, { latitude: p.latitude, longitude: p.longitude });
        return d <= radiusKm * 1000;
      });
    }
    return result;
  }, [selectedCategory, radiusKm, region]);

  // ─── Map controls ───────────────────────────────
  const zoomIn = () => {
    if (!region) return;
    mapRef.current?.animateToRegion(
      { ...region, latitudeDelta: region.latitudeDelta / 2, longitudeDelta: region.longitudeDelta / 2 },
      200,
    );
  };

  const zoomOut = () => {
    if (!region) return;
    mapRef.current?.animateToRegion(
      { ...region, latitudeDelta: region.latitudeDelta * 2, longitudeDelta: region.longitudeDelta * 2 },
      200,
    );
  };

  // ─── FAB animation ──────────────────────────────
  const toggleFab = () => {
    const next = !fabOpen;
    setFabOpen(next);
    Animated.timing(fabSpin, {
      toValue: next ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fabRotation = fabSpin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '135deg'],
  });

  const closeFab = useCallback(() => {
    setFabOpen(false);
    Animated.timing(fabSpin, { toValue: 0, duration: 200, useNativeDriver: true }).start();
  }, [fabSpin]);

  // ─── Radius slider ──────────────────────────────
  const trackRef = useRef<View>(null);

  const onTrackLayout = useCallback(() => {
    trackRef.current?.measure((_x, _y, width) => {
      if (width > 0) {
        trackWidthRef.current = width;
        const step = width / (RADIUS_OPTIONS.length - 1);
        thumbX.setValue(radiusKmIndexRef.current * step);
      }
    });
  }, [thumbX]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        const step = getStepWidth();
        const startIdx = radiusKmIndexRef.current;
        const rawX = startIdx * step + gesture.dx;
        const clampedX = Math.max(0, Math.min(trackWidthRef.current, rawX));
        thumbX.setValue(clampedX);

        const nearestIdx = Math.round(clampedX / step);
        const clampedIdx = Math.max(0, Math.min(RADIUS_OPTIONS.length - 1, nearestIdx));
        setPreviewRadiusKm(RADIUS_OPTIONS[clampedIdx]);
      },
      onPanResponderRelease: (_, gesture) => {
        const step = getStepWidth();
        const startIdx = radiusKmIndexRef.current;
        const rawX = startIdx * step + gesture.dx;
        const clampedX = Math.max(0, Math.min(trackWidthRef.current, rawX));
        const nearestIdx = Math.round(clampedX / step);
        const clampedIdx = Math.max(0, Math.min(RADIUS_OPTIONS.length - 1, nearestIdx));

        thumbX.setValue(clampedIdx * step);
        radiusKmIndexRef.current = clampedIdx;
        setRadiusKm(RADIUS_OPTIONS[clampedIdx]);
        setPreviewRadiusKm(null);
      },
    }),
  ).current;

  const getSelectedCategoryData = () => CATEGORIES.find((c) => c.id === selectedCategory);

  const displayRadiusKm = previewRadiusKm ?? radiusKm;

  // ─── RENDER ──────────────────────────────────────
  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={logoImg}
            style={styles.logoImage}
            resizeMode="contain"
            alt="WayRemote"
          />
        </View>
        <TouchableOpacity style={styles.menuBtn}>
          <Ionicons name="menu" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {TABS.map((tab, index) => {
          const isActive = activeTab === tab.id;
          return (
            <React.Fragment key={tab.id}>
              {index > 0 && <View style={styles.tabDivider} />}
              <TouchableOpacity
                style={styles.tab}
                onPress={() => setActiveTab(tab.id)}
              >
                <Image
                  source={tab.img}
                  style={[styles.tabIcon, !isActive && styles.tabIconInactive]}
                  resizeMode="contain"
                  alt={tab.label}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    isActive ? { color: tab.color } : styles.tabLabelInactive,
                  ]}
                >
                  {tab.label}
                </Text>
                {isActive && <View style={[styles.tabIndicator, { backgroundColor: tab.color }]} />}
              </TouchableOpacity>
            </React.Fragment>
          );
        })}
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        {region && (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={region}
            showsUserLocation={!USE_MOCK}
            showsCompass={false}
            showsScale={false}
          >
            <UrlTile
              urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              maximumZ={19}
              flipY={false}
            />
            {filtered.map((point) => (
              <Marker
                key={point.id}
                coordinate={{
                  latitude: point.latitude,
                  longitude: point.longitude,
                }}
                title={point.name}
                description={point.address}
              />
            ))}
          </MapView>
        )}

        {/* Location overlay — floating on map */}
        <View style={styles.locationOverlay} pointerEvents="none">
          <View style={styles.locationOverlayInner}>
            <Ionicons name="location" size={12} color={colors.white} />
            {loadingLocation ? (
              <View style={styles.locationSkeleton} />
            ) : address ? (
              <Text style={styles.locationOverlayText}>{address}</Text>
            ) : null}
          </View>
        </View>

        {/* Visibility switch — capsule */}
        <View style={styles.mapOverlayTop}>
          <View style={styles.visibilityControl}>
            <Switch
              value={visibleToOthers}
              onValueChange={setVisibleToOthers}
              trackColor={{ false: '#C8C1B5', true: '#147848' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Zoom controls — hidden when speed dial is open */}
        <View style={[styles.zoomControls, fabOpen && styles.zoomControlsHidden]}>
          <TouchableOpacity style={styles.controlBtn} onPress={zoomIn}>
            <Ionicons name="add" size={18} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.controlDivider} />
          <TouchableOpacity style={styles.controlBtn} onPress={zoomOut}>
            <Ionicons name="remove" size={18} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Speed dial menu */}
        <FloatingActionMenu visible={fabOpen} items={fabItems} onClose={closeFab} />

        {/* FAB — bottom-right inside map */}
        <View style={styles.fabContainer}>
          <Animated.View style={{ transform: [{ rotate: fabRotation }] }}>
            <FloatingActionButton icon={fabOpen ? 'close' : 'add'} onPress={toggleFab} />
          </Animated.View>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.fixedControls}>
        <View style={styles.controlsRow}>
          {/* Category button — left */}
          <TouchableOpacity
            style={[
              styles.categoryBtn,
              selectedCategory && selectedCategory !== 'todas' && styles.categoryBtnActive,
            ]}
            activeOpacity={0.8}
            onPress={() => setShowCategoryModal(true)}
            accessibilityLabel="Filtrar por categoria"
            accessibilityRole="button"
          >
            <Ionicons
              name="grid"
              size={20}
              color={
                selectedCategory && selectedCategory !== 'todas'
                  ? getSelectedCategoryData()?.color ?? colors.primary
                  : colors.textSecondary
              }
            />
          </TouchableOpacity>

          {/* Radius slider — right-aligned */}
          <View style={styles.radiusContainer}>
            <View style={styles.radiusLabelRow}>
              <Text style={styles.radiusValue}>Raio: {displayRadiusKm} km</Text>
            </View>
            <View
              ref={trackRef}
              style={styles.radiusTrack}
              onLayout={onTrackLayout}
              {...panResponder.panHandlers}
            >
              <View style={styles.radiusTrackBg} />
              <View
                style={[
                  styles.radiusTrackFill,
                  {
                    width:
                      (RADIUS_OPTIONS.indexOf(radiusKm) / (RADIUS_OPTIONS.length - 1)) * trackWidthRef.current,
                  },
                ]}
              />
              {/* Step marks — one for each value */}
              {RADIUS_OPTIONS.map((val, i) => {
                const x = (i / (RADIUS_OPTIONS.length - 1)) * trackWidthRef.current;
                const isActive = val === radiusKm;
                return (
                  <View
                    key={val}
                    style={[
                      styles.radiusDot,
                      { left: x - 4 },
                      isActive && styles.radiusDotActive,
                    ]}
                  />
                );
              })}
              <Animated.View
                style={[
                  styles.radiusThumb,
                  { transform: [{ translateX: thumbX }] },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Results header */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>RESULTADOS ({filtered.length})</Text>
        </View>
      </View>

      {/* Results */}
      <ScrollView
        style={styles.resultsScroll}
        contentContainerStyle={styles.resultsScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((item) => (
          <PointCard
            key={item.id}
            name={item.name}
            address={item.address}
            category={item.category}
            members={item.members}
            rating={item.rating}
            reviews={item.reviews}
            distance={haversine(
              { latitude: region.latitude, longitude: region.longitude },
              { latitude: item.latitude, longitude: item.longitude },
            ).toFixed(1).replace('.', ',') + ' km'}
            visibility={item.visibility}
            icon={item.icon}
            color={item.color}
            status={item.status}
          />
        ))}
        {filtered.length === 0 && (
          <Text style={styles.emptyText}>NENHUM PONTO ENCONTRADO</Text>
        )}
      </ScrollView>

      {/* Category Modal */}
      <Modal
        visible={showCategoryModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowCategoryModal(false)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Categorias</Text>
            <View style={styles.modalGrid}>
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id || (!selectedCategory && cat.id === 'todas');
                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={[styles.modalItem, isSelected && styles.modalItemSelected]}
                    onPress={() => {
                      setSelectedCategory(cat.id === 'todas' ? null : cat.id);
                      setShowCategoryModal(false);
                    }}
                    activeOpacity={0.7}
                  >
                    <MaterialCommunityIcons
                      name={cat.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                      size={22}
                      color={isSelected ? colors.white : cat.color}
                    />
                    <Text
                      style={[styles.modalItemText, isSelected && styles.modalItemTextSelected]}
                      numberOfLines={1}
                    >
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <TouchableOpacity
              style={styles.modalClearBtn}
              onPress={() => {
                setSelectedCategory(null);
                setShowCategoryModal(false);
              }}
            >
              <Text style={styles.modalClearText}>Limpar filtro</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
