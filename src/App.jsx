import React, { useState } from 'react';

// --- データベース ---
const DB = {
  colors: [
    { level: 1, name: '単色 (Monochromatic)', desc: '特定の色相のみで明度・彩度を変えて表現' },
    { level: 1, name: 'パステルカラー', desc: '柔らかく淡い色調で統一' },
    { level: 1, name: '暖色系', desc: '赤・オレンジ・黄色を基調に温かさを表現' },
    { level: 1, name: '寒色系', desc: '青・緑を基調に冷たさや静寂を表現' },
    { level: 2, name: '補色 (Complementary)', desc: '色相環で反対にある2色（青とオレンジ等）の対比' },
    { level: 2, name: 'ビビッドカラー', desc: '鮮やかな色彩を全体またはアクセントに' },
    { level: 2, name: '3色制限', desc: '画面内で使用する色をきっちり3色に絞る' },
    { level: 3, name: 'ティール＆オレンジ', desc: 'シネマティックな青緑（影）とオレンジ（光・肌）' },
    { level: 3, name: '類似色', desc: '色相環で隣り合う色でまとめ、調和を持たせる' },
    { level: 3, name: 'カラーアイソレーション', desc: '全体を低彩度に保ち、特定の1要素だけを鮮やかに' },
    { level: 4, name: 'サイバーパンク / ネオン', desc: '暗闇の中に高彩度な発光色（ピンクやシアン）を配置' }
  ],
  lightings: [
    { level: 1, name: '斜光 (Side Lighting)', desc: '横や斜めからの光で立体感を強調' },
    { level: 1, name: 'トップライト', desc: '真上からの強い光' },
    { level: 1, name: '均一な光 (Flat Lighting)', desc: '影が少なく、形や色を正確に見せる光' },
    { level: 2, name: '逆光 (Backlighting)', desc: '背後からの光でシルエットや輪郭の光を強調' },
    { level: 2, name: 'ボトムライト', desc: '下からの光で不気味さや非日常感を演出' },
    { level: 2, name: 'シルエット', desc: '被写体を完全に影にして形だけで魅せる' },
    { level: 3, name: '木漏れ日', desc: '葉の間から漏れるような斑点状の複雑な光' },
    { level: 3, name: '3灯照明 (Three-Point)', desc: 'キー、フィル、バックライトによる王道の立体表現' },
    { level: 3, name: 'レンブラントライト', desc: '顔の片側を暗くし、頬に逆三角形の光を作る' },
    { level: 3, name: 'プラクティカルライト', desc: '画面内に映る光源（街灯やランプ）を主光源にする' },
    { level: 4, name: '特定の光源', desc: 'スマホの画面、マッチの火など、限定的で小さな光' },
    { level: 4, name: 'ボリュメトリックライト', desc: '霧や埃に差し込む「光の筋（ゴッドレイ）」' }
  ],
  themes: [
    { level: 1, name: '静寂', desc: '音のない、穏やかな時間' },
    { level: 1, name: '内省', desc: '深く考え込んでいる、自分と向き合う様子' },
    { level: 2, name: '躍動感', desc: '動き、エネルギー、スピード感' },
    { level: 2, name: '圧倒的なスケール', desc: '巨大な空間や物に対する小ささの強調' },
    { level: 3, name: '予兆', desc: '何かが起こる前触れ、緊張感' },
    { level: 3, name: '秘密', desc: '何かを隠している、または二人だけの空間' },
    { level: 3, name: 'ノスタルジー', desc: 'どこか懐かしく、色褪せた記憶のような空気' },
    { level: 4, name: '対決', desc: '何かに立ち向かう、あるいは対峙する瞬間' },
    { level: 4, name: '何かが終わった後', desc: '出来事の後の虚脱感、または余韻' },
    { level: 4, name: '疾走感', desc: '猛スピードで移動している瞬間の切り取り' },
    { level: 4, name: '群衆の中の孤独', desc: '周りに要素が多い中で、主役だけが孤立して見える' }
  ],
  compositions: [
    { level: 1, name: '三分割法', desc: '画面を縦横3等分し、交点に主役を置く' },
    { level: 1, name: '日の丸構図', desc: '主役を中央に配置し、存在感を強調' },
    { level: 1, name: '対称性 (Symmetry)', desc: '画面が左右または上下で対称になるように配置' },
    { level: 2, name: 'リーディングライン', desc: '線（道、壁、視線）を使って主役へ目を誘導する' },
    { level: 2, name: '前景・中景・背景の層', desc: '手前に物を置き、3つの層で奥行きを作る' },
    { level: 2, name: '被写界深度 (前ボケ)', desc: '手前の物をボカし、奥の主役にピントを合わせる' },
    { level: 3, name: 'ネガティブスペース', desc: 'あえて「何も描かない空間（余白）」を広く取る' },
    { level: 3, name: '特定の比率 (21:9等)', desc: 'シネマスコープなど、横長や極端なアスペクト比を意識' },
    { level: 4, name: 'フレーム内フレーム', desc: '窓やドアなど、画面内の枠でキャラクターを囲む' },
    { level: 4, name: '黄金比グリッド', desc: '1:1.618の比率で分割し、自然な美しさを生む' },
    { level: 4, name: '黄金螺旋', desc: '渦を巻くようなカーブに沿って視線を誘導する' },
    { level: 4, name: '黄金三角形', desc: '対角線と垂直線を利用し、斜めの動きを強調' },
    { level: 4, name: 'ダッチアングル', desc: 'カメラを意図的に斜めに傾け、不安や動力を演出' }
  ],
  directions: [
    { level: 1, name: '俯瞰 (ハイアングル)', desc: '斜め上から見下ろす客観的な視点' },
    { level: 1, name: 'アオリ (ローアングル)', desc: '低い位置から見上げ、威厳や巨大さを演出' },
    { level: 1, name: '真横のプロファイル', desc: '真横からのシルエットや顔のラインを見せる' },
    { level: 2, name: '肩越しショット', desc: '手前の人物の肩越しに、奥の主役を映す' },
    { level: 2, name: 'エクストリーム・ロング', desc: '風景の中でキャラクターが豆粒のように映る引きの絵' },
    { level: 3, name: 'エクストリーム・クローズ', desc: '目元や手元だけに極端にズームする' },
    { level: 3, name: '視線は画面外へ', desc: '見えない「何か」を見つめさせる' },
    { level: 4, name: '顔の一部を隠す', desc: '影や物で顔を隠し、感情を想像させる' },
    { level: 4, name: '不自然な体勢', desc: '落下中など、重力に逆らう、または無理な姿勢' },
    { level: 4, name: '感情の「焦燥」', desc: '余裕のなさ、焦りを感じさせる仕草' },
    { level: 4, name: '感情の「歓喜」', desc: '爆発的な喜びを感じさせるポーズ' },
    { level: 4, name: '第四の壁を破る', desc: '鑑賞者（カメラ）を真っ直ぐに見つめる' }
  ],
  charStyles: ['ストリートウェア', '制服アレンジ', 'サイバーパンク', 'ゴシック', 'カジュアル', 'ドレス・スーツ', '未来的なSFスーツ', '和洋折衷'],
  charItems: ['レトロなデジタルカメラ', 'ヘッドフォン', 'スマートフォン', '楽器（ギター等）', '大きな武器', '本・書類', '花束', '車のキー'],
  charFeatures: ['眼鏡・サングラス', '帽子', '特徴的なヘアスタイル', '絆創膏や傷', 'メカニカルなパーツ（義手など）', 'ピアス/アクセサリー', 'オッドアイ', 'タトゥー/ペイント']
};

const COURSES = {
  A: { name: '3日コース', maxDay: 3, desc: 'お試し・超短期集中' },
  B: { name: '1週間コース', maxDay: 7, desc: '基礎マスター' },
  C: { name: '1ヶ月コース', maxDay: 30, desc: '習慣化と定着' },
  D: { name: '3ヶ月コース', maxDay: 90, desc: '本格的なスキル習得' },
};

export default function App() {
  const [appState, setAppState] = useState('SETUP'); // SETUP, READY, THEME_GENERATED, COMPLETED
  const [selectedCourse, setSelectedCourse] = useState('B');
  const [charOption, setCharOption] = useState('1'); 
  const [currentDay, setCurrentDay] = useState(1);
  const [currentTheme, setCurrentTheme] = useState(null);
  const [copyStatus, setCopyStatus] = useState('COPY TO SHARE');

  const calculateLevel = (courseId, day) => {
    if (courseId === 'A') {
      if (day === 1) return 1;
      if (day === 2) return 3; 
      return 4;
    }
    if (courseId === 'B') {
      if (day <= 2) return 1;
      if (day <= 4) return 2;
      if (day <= 6) return 3;
      return 4;
    }
    if (courseId === 'C') {
      if (day <= 7) return 1;
      if (day <= 15) return 2;
      if (day <= 23) return 3;
      return 4;
    }
    if (courseId === 'D') {
      if (day <= 21) return 1;
      if (day <= 42) return 2;
      if (day <= 63) return 3;
      return 4;
    }
    return 1;
  };

  const currentLevel = appState !== 'SETUP' ? calculateLevel(selectedCourse, currentDay) : 1;

  const getRandomElement = (array, maxLevel) => {
    const available = array.filter(item => item.level <= maxLevel);
    const targetArray = available.length > 0 ? available : array;
    return targetArray[Math.floor(Math.random() * targetArray.length)];
  };

  const getRandomSimple = (array) => array[Math.floor(Math.random() * array.length)];

  const generateTheme = () => {
    const level = calculateLevel(selectedCourse, currentDay);
    
    const color = getRandomElement(DB.colors, level);
    const lighting = getRandomElement(DB.lightings, level);
    const theme = getRandomElement(DB.themes, level);
    const composition = getRandomElement(DB.compositions, level);
    const direction = getRandomElement(DB.directions, level);

    let charData = null;
    if (charOption === '2') {
      charData = {
        style: getRandomSimple(DB.charStyles),
        item: getRandomSimple(DB.charItems),
        feature: getRandomSimple(DB.charFeatures)
      };
    }

    const title = `${theme.name.split(' ')[0]} / ${direction.name.split(' ')[0]}`;
    const message = `今回は「${composition.name}」をベースに、「${lighting.name}」の光で「${theme.name}」の空気を演出します。${level >= 3 ? '視線誘導を強く意識して、' : 'まずは配置のバランスを意識して、'}作品を構築してください。`;

    setCurrentTheme({ title, color, lighting, theme, composition, direction, charData, message });
    setAppState('THEME_GENERATED');
    setCopyStatus('COPY TO SHARE');
  };

  const handleNextDay = () => {
    const maxDay = COURSES[selectedCourse].maxDay;
    if (currentDay >= maxDay) {
      setAppState('COMPLETED');
    } else {
      setCurrentDay(prev => prev + 1);
      setAppState('READY');
      setCurrentTheme(null);
    }
  };

  const resetApp = () => {
    setAppState('SETUP');
    setCurrentDay(1);
    setCurrentTheme(null);
  };

  // 生成されたテーマをSNS共有用にフォーマットしてコピーする機能
  const copyThemeToClipboard = () => {
    if (!currentTheme) return;

    let text = `【Day ${currentDay} / Level ${currentLevel}】今日の画面構成お題\n`;
    text += `タイトル: ${currentTheme.title}\n\n`;
    text += `🎨 条件\n`;
    text += `・色: ${currentTheme.color.name.split(' (')[0]}\n`; // 英語部分はカットしてすっきりさせる
    text += `・照明: ${currentTheme.lighting.name.split(' (')[0]}\n`;
    text += `・テーマ: ${currentTheme.theme.name}\n`;
    text += `・空間-比率: ${currentTheme.composition.name.split(' (')[0]}\n`;
    text += `・誘導: ${currentTheme.direction.name.split(' (')[0]}\n`;

    if (currentTheme.charData) {
      text += `\n👤 キャラクター\n`;
      text += `・スタイル: ${currentTheme.charData.style}\n`;
      text += `・アイテム: ${currentTheme.charData.item}\n`;
      text += `・特徴: ${currentTheme.charData.feature}\n`;
    }

    text += `\n#画面構成トレーニング`;

    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopyStatus('COPIED!');
      setTimeout(() => setCopyStatus('COPY TO SHARE'), 2000);
    } catch (err) {
      setCopyStatus('FAILED');
    }
    document.body.removeChild(textArea);
  };

  // --- UI Components ---

  const SetupScreen = () => (
    <div className="max-w-3xl mx-auto p-6 md:p-10 bg-white border-2 border-gray-900 mt-10 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)]">
      <div className="text-center mb-10 border-b-2 border-gray-900 pb-8">
        <h1 className="text-3xl md:text-5xl font-black tracking-widest uppercase mb-3 text-gray-900 leading-tight">Composition<br/>Practice</h1>
        <p className="text-gray-900 font-bold text-sm tracking-widest uppercase">画面構成トレーニングアプリ</p>
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="text-sm font-black mb-4 tracking-widest uppercase text-gray-900 bg-gray-100 inline-block px-3 py-1 border-2 border-gray-900">01. Course</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Object.entries(COURSES).map(([key, data]) => (
              <label key={key} className={`block border-2 p-5 cursor-pointer transition-all ${selectedCourse === key ? 'bg-gray-900 text-white border-gray-900 shadow-none translate-x-1 translate-y-1' : 'bg-white text-gray-900 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)]'}`}>
                <input type="radio" name="course" value={key} checked={selectedCourse === key} onChange={(e) => setSelectedCourse(e.target.value)} className="hidden" />
                <div className="flex flex-col h-full justify-between">
                  <span className="font-black tracking-widest text-xl mb-2">{key}. {data.name}</span>
                  <span className={`text-xs tracking-widest uppercase font-bold ${selectedCourse === key ? 'text-gray-300' : 'text-gray-500'}`}>{data.desc}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black mb-4 tracking-widest uppercase text-gray-900 bg-gray-100 inline-block px-3 py-1 border-2 border-gray-900">02. Character</h2>
          <div className="grid grid-cols-1 gap-5">
            <label className={`block border-2 p-5 cursor-pointer transition-all ${charOption === '1' ? 'bg-gray-900 text-white border-gray-900 shadow-none translate-x-1 translate-y-1' : 'bg-white text-gray-900 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)]'}`}>
              <input type="radio" name="char" value="1" checked={charOption === '1'} onChange={(e) => setCharOption(e.target.value)} className="hidden" />
              <div className="flex flex-col">
                <span className="font-black tracking-widest text-xl mb-1">A. 自分で自由に決める</span>
                <span className={`text-xs tracking-widest uppercase font-bold ${charOption === '1' ? 'text-gray-300' : 'text-gray-500'}`}>構図のお題のみ提示</span>
              </div>
            </label>
            <label className={`block border-2 p-5 cursor-pointer transition-all ${charOption === '2' ? 'bg-gray-900 text-white border-gray-900 shadow-none translate-x-1 translate-y-1' : 'bg-white text-gray-900 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)]'}`}>
              <input type="radio" name="char" value="2" checked={charOption === '2'} onChange={(e) => setCharOption(e.target.value)} className="hidden" />
              <div className="flex flex-col">
                <span className="font-black tracking-widest text-xl mb-1">B. AIにおまかせする</span>
                <span className={`text-xs tracking-widest uppercase font-bold ${charOption === '2' ? 'text-gray-300' : 'text-gray-500'}`}>服装やアイテムなどの属性も提示</span>
              </div>
            </label>
          </div>
        </div>

        <button 
          onClick={() => setAppState('READY')}
          className="w-full py-5 bg-white border-2 border-gray-900 text-gray-900 text-xl font-black tracking-widest uppercase transition-all shadow-[6px_6px_0px_0px_rgba(17,24,39,1)] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 hover:bg-gray-900 hover:text-white mt-4"
        >
          Start Training
        </button>
      </div>
    </div>
  );

  const MainScreen = () => {
    const courseData = COURSES[selectedCourse];
    
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8 text-gray-900 min-h-screen">
        <div className="flex flex-wrap items-end justify-between border-b-4 border-gray-900 pb-4 mb-10">
          <div className="mb-4 md:mb-0">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1 font-black">Course</p>
            <p className="font-black text-2xl tracking-widest">{courseData.name}</p>
          </div>
          <div className="flex space-x-8">
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1 font-black">Progress</p>
              <p className="font-black text-lg tracking-widest">DAY <span className="text-4xl ml-1">{currentDay}</span><span className="text-gray-400 text-sm ml-1">/ {courseData.maxDay}</span></p>
            </div>
            <div className="text-right flex flex-col justify-between">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-black">Level</p>
              <div className="flex space-x-1.5 justify-end pb-1.5">
                {[1,2,3,4].map(l => (
                  <div key={l} className={`w-6 h-2 ${l <= currentLevel ? 'bg-gray-900' : 'bg-gray-300'}`}></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {appState === 'READY' ? (
          <div className="flex flex-col items-center justify-center py-40 border-4 border-gray-900 bg-white">
            <p className="text-gray-900 mb-8 tracking-widest font-black uppercase text-lg">Are you ready?</p>
            <button 
              onClick={generateTheme}
              className="px-10 py-5 bg-white border-2 border-gray-900 text-gray-900 text-2xl font-black tracking-widest uppercase transition-all shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 hover:bg-gray-900 hover:text-white"
            >
              Generate Theme
            </button>
          </div>
        ) : (
          <div className="bg-white border-2 border-gray-900 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-[12px_12px_0px_0px_rgba(17,24,39,1)] mb-10">
            <div className="p-8 md:p-12 border-b-2 border-gray-900 bg-[#f4f4f0]">
              <h2 className="text-xs text-gray-500 font-black mb-4 tracking-widest uppercase border-l-4 border-gray-900 pl-3">Prompt Title</h2>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">{currentTheme.title}</h3>
            </div>

            <div className="p-8 md:p-12">
              <div className="mb-14">
                <h4 className="text-sm font-black tracking-widest uppercase border-b-2 border-gray-900 pb-3 mb-6">Conditions</h4>
                <div className="border-t-2 border-gray-900">
                  <div className="flex flex-col md:flex-row border-b border-gray-300 py-6">
                    <span className="w-48 font-black text-gray-900 text-sm tracking-widest uppercase mb-2 md:mb-0 md:mt-1">Color</span>
                    <div>
                      <span className="font-black text-xl block mb-2">{currentTheme.color.name}</span>
                      <span className="text-gray-600 font-medium">{currentTheme.color.desc}</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row border-b border-gray-300 py-6">
                    <span className="w-48 font-black text-gray-900 text-sm tracking-widest uppercase mb-2 md:mb-0 md:mt-1">Lighting</span>
                    <div>
                      <span className="font-black text-xl block mb-2">{currentTheme.lighting.name}</span>
                      <span className="text-gray-600 font-medium">{currentTheme.lighting.desc}</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row border-b border-gray-300 py-6">
                    <span className="w-48 font-black text-gray-900 text-sm tracking-widest uppercase mb-2 md:mb-0 md:mt-1">Theme / Action</span>
                    <div>
                      <span className="font-black text-xl block mb-2">{currentTheme.theme.name}</span>
                      <span className="text-gray-600 font-medium">{currentTheme.theme.desc}</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row border-b border-gray-300 py-6">
                    <span className="w-48 font-black text-gray-900 text-sm tracking-widest uppercase mb-2 md:mb-0 md:mt-1">Composition</span>
                    <div>
                      <span className="font-black text-xl block mb-2">{currentTheme.composition.name}</span>
                      <span className="text-gray-600 font-medium">{currentTheme.composition.desc}</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row border-b-2 border-gray-900 py-6">
                    <span className="w-48 font-black text-gray-900 text-sm tracking-widest uppercase mb-2 md:mb-0 md:mt-1">Direction</span>
                    <div>
                      <span className="font-black text-xl block mb-2">{currentTheme.direction.name}</span>
                      <span className="text-gray-600 font-medium">{currentTheme.direction.desc}</span>
                    </div>
                  </div>
                </div>
              </div>

              {currentTheme.charData && (
                <div className="mb-14">
                  <h4 className="text-sm font-black tracking-widest uppercase border-b-2 border-gray-900 pb-3 mb-6">Character</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-gray-900 bg-gray-50">
                    <div className="p-6 border-b-2 md:border-b-0 md:border-r-2 border-gray-900">
                      <p className="text-xs text-gray-500 tracking-widest mb-3 uppercase font-black">Style</p>
                      <p className="font-black text-xl">{currentTheme.charData.style}</p>
                    </div>
                    <div className="p-6 border-b-2 md:border-b-0 md:border-r-2 border-gray-900">
                      <p className="text-xs text-gray-500 tracking-widest mb-3 uppercase font-black">Key Item</p>
                      <p className="font-black text-xl">{currentTheme.charData.item}</p>
                    </div>
                    <div className="p-6">
                      <p className="text-xs text-gray-500 tracking-widest mb-3 uppercase font-black">Feature</p>
                      <p className="font-black text-xl">{currentTheme.charData.feature}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-10 border-4 border-gray-900 p-8 bg-gray-900 text-white relative">
                <div className="absolute top-0 left-0 bg-white text-gray-900 font-black tracking-widest text-xs px-3 py-1 border-b-4 border-r-4 border-gray-900">NOTE</div>
                <p className="text-white leading-relaxed font-bold text-lg mt-4">{currentTheme.message}</p>
              </div>

              {/* ボタンエリア：コピーボタンと次へボタン */}
              <div className="mt-16 flex flex-col md:flex-row justify-end gap-5">
                <button 
                  onClick={copyThemeToClipboard}
                  className="px-8 py-5 bg-white border-2 border-gray-900 text-gray-900 font-black tracking-widest uppercase transition-all shadow-[6px_6px_0px_0px_rgba(17,24,39,1)] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 active:bg-gray-100 flex items-center justify-center text-lg w-full md:w-auto"
                >
                  <span className="mr-3 text-xl">📋</span> {copyStatus}
                </button>
                <button 
                  onClick={handleNextDay}
                  className="px-8 py-5 bg-gray-900 border-2 border-gray-900 text-white font-black tracking-widest uppercase transition-all shadow-[6px_6px_0px_0px_rgba(17,24,39,1)] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 hover:bg-black flex items-center justify-center text-lg w-full md:w-auto"
                >
                  Complete & Next <span className="ml-4 font-normal text-3xl leading-none">→</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const CompletedScreen = () => (
    <div className="max-w-3xl mx-auto p-12 bg-white border-4 border-gray-900 text-center mt-20 shadow-[12px_12px_0px_0px_rgba(17,24,39,1)]">
      <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-8 text-gray-900 border-b-4 border-gray-900 pb-8 inline-block">
        Completed
      </h1>
      <p className="text-xl text-gray-900 mb-12 font-bold leading-relaxed">
        {COURSES[selectedCourse].name}の全日程を完走しました。<br/>
        あなたの画面構成スキルは確実に向上しています。
      </p>
      <button 
        onClick={resetApp}
        className="px-10 py-5 bg-white border-2 border-gray-900 text-gray-900 font-black tracking-widest uppercase transition-all shadow-[6px_6px_0px_0px_rgba(17,24,39,1)] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 hover:bg-gray-900 hover:text-white"
      >
        Start New Course
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f4f0] font-sans selection:bg-gray-900 selection:text-white">
      {/* Navigation (シンプルにタイトルのみ) */}
      <nav className="border-b-4 border-gray-900 bg-white px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="font-black tracking-widest uppercase text-lg md:text-2xl cursor-pointer" onClick={appState === 'COMPLETED' ? resetApp : () => {}}>
          Comp. Practice
        </div>
      </nav>

      <div className="pb-24 pt-8">
        {appState === 'SETUP' && <SetupScreen />}
        {(appState === 'READY' || appState === 'THEME_GENERATED') && <MainScreen />}
        {appState === 'COMPLETED' && <CompletedScreen />}
      </div>
    </div>
  );
}
