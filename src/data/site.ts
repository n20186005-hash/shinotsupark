export const site = {
  name: 'しのつ公園',
  shortName: 'SHINOTSU PARK',
  description: '北海道・新篠津村。しのつ湖の水辺、広い空、温泉と季節の遊びをゆっくり楽しむための非公式ガイド。',
  locale: 'ja_JP',
  lang: 'ja',
  address: '北海道石狩郡新篠津村第45線北2（しのつ湖畔）',
  coordinates: { lat: 43.213277, lng: 141.6447268 },
  phone: '0126-58-3166',
  gaId: 'G-HXM22WWPKP',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=43.213277,141.6447268',
} as const;

export const navItems = [
  { href: '/park/', label: '公園を知る' },
  { href: '/season/', label: '四季の楽しみ' },
  { href: '/access/', label: 'アクセス' },
  { href: '/food/', label: '周辺グルメ' },
  { href: '/around/', label: '周辺スポット' },
  { href: '/memory-card/', label: '旅の記念カード' },
] as const;

export const quickFacts = [
  { label: '札幌から', value: '車で約50分', note: '道路状況により変動' },
  { label: '駐車場', value: '約100台・無料', note: '道の駅・温泉周辺' },
  { label: 'おすすめ', value: '湖畔散歩と温泉', note: '半日〜1日の滞在' },
] as const;

export const seasons = [
  {
    season: '春',
    kana: 'はる',
    title: '水辺にやわらかな色が戻る',
    description: '雪解けの空気を感じながら、公園と湖畔を静かに歩く季節。風が冷たい日もあるため、薄手の上着があると安心です。',
    points: ['湖畔散歩', 'ピクニック', '田園ドライブ'],
  },
  {
    season: '夏',
    kana: 'なつ',
    title: '芝生と青空を一日楽しむ',
    description: 'キャンプ、グランピング、バーベキューなど、しのつ公園らしい屋外時間が広がります。夕方の湖面と大きな空も見どころです。',
    points: ['キャンプ', '芝生時間', '夕景'],
  },
  {
    season: '秋',
    kana: 'あき',
    title: '実りの村を味わう',
    description: '澄んだ空と田園の色が印象的な季節。産直市場や地元食材の食事と合わせて、ゆっくり巡るのがおすすめです。',
    points: ['地元グルメ', '写真散歩', '温泉'],
  },
  {
    season: '冬',
    kana: 'ふゆ',
    title: '白い湖とワカサギ釣り',
    description: 'しのつ湖が雪景色に包まれ、冬の名物ワカサギ釣りの季節へ。遊んだあとは、隣接する天然温泉で身体を温められます。',
    points: ['ワカサギ釣り', '雪景色', 'たっぷの湯'],
  },
] as const;

export const foods = [
  {
    name: '大地のテラス 縁',
    category: 'レストラン',
    lead: '新篠津産のお米や地元食材を味わえる、道の駅内のレストラン。',
    detail: '朝は和洋70種類以上のビュッフェ、昼・夜は定食や御膳など。しのつ湖を眺めながらゆっくり食事ができます。',
    hours: '11:00〜21:00／朝食 7:00〜9:00',
    area: '公園に隣接',
    accent: 'rice',
  },
  {
    name: 'IL LAGO（イルラーゴ）',
    category: 'テイクアウト',
    lead: '湖畔で楽しむ、生乳ソフトクリームと地元野菜の軽食。',
    detail: '名前はイタリア語で「湖」。ソフトクリーム、グリーンスムージー、季節によってピザなどを販売します。',
    hours: '平日 10:00〜15:00／土日祝 10:00〜16:00',
    area: '道の駅となり',
    accent: 'lake',
  },
  {
    name: 'しんしのつごはん こめっさく',
    category: 'テイクアウト',
    lead: '村の米と野菜を手軽に味わう、季節の小さなごはん処。',
    detail: '田舎味噌を使った味噌から揚げが人気。春のアスパラ、秋のさつまいもなど季節の味も楽しめます。',
    hours: '11:00〜17:00（季節変動あり）',
    area: '公園・産直市場の隣',
    accent: 'field',
  },
  {
    name: '味処 ろばた',
    category: '食事処',
    lead: '地元の日常に触れられる、家庭料理のあたたかな店。',
    detail: '日替わりランチ、天丼、カツカレー、寒い季節のおでんなど。夜は地元の人との交流も楽しめます。',
    hours: '平日 11:30〜13:00／17:00〜22:00（日曜除く）',
    area: '新篠津市街',
    accent: 'hearth',
  },
] as const;

export const nearbySpots = [
  {
    name: 'しんしのつ温泉 たっぷの湯',
    tag: '温泉',
    distance: '公園に隣接',
    image: '/images/shinotsu-overview.webp',
    imageAlt: 'しのつ公園と湖畔に広がる緑の風景',
    description: '塩分を含む天然温泉。湖畔で遊んだあとや、冬のワカサギ釣りのあとに立ち寄りやすい施設です。',
  },
  {
    name: '道の駅 しんしのつ',
    tag: '買う・食べる',
    distance: '公園に隣接',
    image: '/images/shinotsu-camp-sign.webp',
    imageAlt: 'しのつ公園の施設案内と周辺の風景',
    description: '温泉、宿泊、レストラン、売店がまとまる旅の拠点。地元の米や特産品を探すのにも便利です。',
  },
  {
    name: 'しんしのつ天文台',
    tag: '星空',
    distance: '新篠津村内',
    image: '/images/shinotsu-sky.webp',
    imageAlt: '新篠津村の広い空としのつ公園展望台',
    description: '2023年開設のフルオープン式天文台。開けた空の下、50cmカセグレン式反射望遠鏡で星を観察できます。',
  },
  {
    name: '宮島沼',
    tag: '自然',
    distance: '美唄方面',
    image: '/images/shinotsu-bridge.webp',
    imageAlt: '水辺に架かる橋と北海道の空',
    description: '渡り鳥の飛来で知られるラムサール条約登録湿地。季節と観察ルールを確認して訪れたい自然スポットです。',
  },
  {
    name: 'いわみざわ公園・バラ園',
    tag: '花・散歩',
    distance: '岩見沢方面',
    image: '/images/shinotsu-flowers.webp',
    imageAlt: '北海道の公園に咲く季節の花',
    description: '広い公園とバラ園を楽しめる立ち寄り先。しのつ公園と組み合わせて、空知の自然を巡る一日に。',
  },
  {
    name: '宝水ワイナリー',
    tag: 'ワイン',
    distance: '岩見沢方面',
    image: '/images/shinotsu-path.webp',
    imageAlt: '北海道の緑の中を通る散策路',
    description: '田園風景の中にあるワイナリー。営業日や見学・販売状況を事前に確認して訪れるのがおすすめです。',
  },
] as const;

export const accessRoutes = [
  {
    from: '札幌市内から',
    mode: '車',
    total: '約50分',
    steps: ['札幌市内', '国道275号方面', '新篠津村', 'しのつ公園・道の駅'],
    note: '冬季は路面状況により大きく変わります。余裕を持った計画を。',
  },
  {
    from: '新千歳空港から',
    mode: '車',
    total: '約1時間40分',
    steps: ['新千歳空港', '道央圏の幹線道路', '新篠津村', 'しのつ公園'],
    note: '公式観光案内の村までの目安。経路と交通状況を出発前に確認してください。',
  },
  {
    from: '新千歳空港・札幌方面から',
    mode: 'JR＋バス',
    total: '乗継を含め要確認',
    steps: ['新千歳空港・札幌', 'JR函館本線 上幌向駅', '新篠津交通バス', '新篠津市街', '徒歩10分弱'],
    note: 'バスの本数が限られるため、往復の時刻を先に決めてください。',
  },
  {
    from: '旭川方面から',
    mode: 'JR＋バス',
    total: '乗継を含め要確認',
    steps: ['旭川駅', 'JR函館本線 岩見沢駅', '新篠津交通バス 約30分', '新篠津市街', '徒歩10分弱'],
    note: 'イベント・季節により運行情報が変わる可能性があります。',
  },
] as const;
