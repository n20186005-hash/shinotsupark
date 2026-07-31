type CardSize = 'square' | 'postcard' | 'story';
type CardStyle = 'lake' | 'field' | 'sunset';

type LoadedPhoto = { source: CanvasImageSource; width: number; height: number; cleanup?: () => void };

const sizeMap: Record<CardSize, { width: number; height: number; label: string }> = {
  square: { width: 1200, height: 1200, label: '1:1' },
  postcard: { width: 1200, height: 1776, label: 'はがき縦' },
  story: { width: 1080, height: 1920, label: '9:16' },
};

const styleMap: Record<CardStyle, { top: string; bottom: string; accent: string; paper: string }> = {
  lake: { top: 'rgba(40,94,102,.04)', bottom: 'rgba(17,49,54,.86)', accent: '#d4e7e5', paper: '#f3f0e5' },
  field: { top: 'rgba(99,120,72,.02)', bottom: 'rgba(42,62,37,.86)', accent: '#e3d9a8', paper: '#f3eddf' },
  sunset: { top: 'rgba(205,136,104,.06)', bottom: 'rgba(80,44,48,.88)', accent: '#f0c8ad', paper: '#f4e7dc' },
};

function formatDate(date = new Date()): string {
  return new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date).replaceAll('/', '.');
}

function drawCover(ctx: CanvasRenderingContext2D, photo: LoadedPhoto, x: number, y: number, width: number, height: number): void {
  const sourceRatio = photo.width / photo.height;
  const targetRatio = width / height;
  let sx = 0, sy = 0, sw = photo.width, sh = photo.height;
  if (sourceRatio > targetRatio) {
    sw = photo.height * targetRatio;
    sx = (photo.width - sw) / 2;
  } else {
    sh = photo.width / targetRatio;
    sy = (photo.height - sh) / 2;
  }
  ctx.drawImage(photo.source, sx, sy, sw, sh, x, y, width, height);
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, radius);
}

function drawPlaceholder(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, '#b7d1d2');
  grad.addColorStop(.55, '#dfe6d5');
  grad.addColorStop(1, '#e6c9a4');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = 'rgba(255,255,255,.26)';
  ctx.beginPath();
  ctx.arc(width * .74, height * .25, width * .13, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(30,73,78,.2)';
  ctx.lineWidth = Math.max(3, width * .003);
  ctx.beginPath();
  ctx.moveTo(0, height * .58);
  ctx.bezierCurveTo(width * .24, height * .48, width * .56, height * .68, width, height * .52);
  ctx.stroke();
  ctx.fillStyle = 'rgba(23,63,69,.72)';
  ctx.font = `600 ${Math.round(width * .035)}px system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('写真を選ぶと、ここに表示されます', width / 2, height / 2);
}

async function loadPhoto(file: File): Promise<LoadedPhoto> {
  if ('createImageBitmap' in window) {
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
    return { source: bitmap, width: bitmap.width, height: bitmap.height, cleanup: () => bitmap.close() };
  }
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.decoding = 'async';
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error('画像を読み込めませんでした。'));
    image.src = url;
  });
  return { source: image, width: image.naturalWidth, height: image.naturalHeight, cleanup: () => URL.revokeObjectURL(url) };
}

export function initMemoryCard(): void {
  const canvas = document.querySelector<HTMLCanvasElement>('#memory-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const placeInput = document.querySelector<HTMLInputElement>('#place-name');
  const dateInput = document.querySelector<HTMLInputElement>('#visit-date');
  const status = document.querySelector<HTMLElement>('#card-status');
  const downloadButton = document.querySelector<HTMLButtonElement>('#download-card');
  const fileInputs = Array.from(document.querySelectorAll<HTMLInputElement>('input[data-photo-input]'));
  const triggerButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('button[data-file-target]'));
  const sizeRadios = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="card-size"]'));
  const styleRadios = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="card-style"]'));

  if (dateInput && !dateInput.value) dateInput.value = formatDate();
  let selectedSize: CardSize = 'square';
  let selectedStyle: CardStyle = 'lake';
  let photo: LoadedPhoto | null = null;

  const render = (): void => {
    const size = sizeMap[selectedSize];
    const style = styleMap[selectedStyle];
    canvas.width = size.width;
    canvas.height = size.height;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    if (photo) drawCover(ctx, photo, 0, 0, w, h);
    else drawPlaceholder(ctx, w, h);

    const topWash = ctx.createLinearGradient(0, 0, 0, h);
    topWash.addColorStop(0, style.top);
    topWash.addColorStop(.48, 'rgba(0,0,0,0)');
    topWash.addColorStop(1, style.bottom);
    ctx.fillStyle = topWash;
    ctx.fillRect(0, 0, w, h);

    const inset = Math.round(w * .038);
    ctx.strokeStyle = 'rgba(255,255,255,.78)';
    ctx.lineWidth = Math.max(2, w * .002);
    roundedRect(ctx, inset, inset, w - inset * 2, h - inset * 2, Math.round(w * .015));
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = style.accent;
    ctx.font = `700 ${Math.round(w * .018)}px system-ui, sans-serif`;
    ctx.letterSpacing = `${Math.round(w * .005)}px`;
    ctx.fillText('HOKKAIDO · SHINSHINOTSU', inset * 1.55, h - inset * 4.4);

    const place = (placeInput?.value || 'しのつ公園').trim().slice(0, 28);
    const date = (dateInput?.value || formatDate()).trim().slice(0, 24);
    ctx.fillStyle = '#ffffff';
    ctx.font = `500 ${Math.round(w * (selectedSize === 'story' ? .075 : .072))}px "Yu Mincho", "Hiragino Mincho ProN", serif`;
    ctx.letterSpacing = `${Math.round(w * .004)}px`;
    ctx.fillText(place || 'しのつ公園', inset * 1.55, h - inset * 2.7);
    ctx.font = `600 ${Math.round(w * .022)}px system-ui, sans-serif`;
    ctx.letterSpacing = `${Math.round(w * .003)}px`;
    ctx.fillStyle = 'rgba(255,255,255,.9)';
    ctx.fillText(date || formatDate(), inset * 1.55, h - inset * 1.75);

    ctx.save();
    ctx.translate(w - inset * 1.4, h - inset * 1.55);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(255,255,255,.65)';
    ctx.font = `600 ${Math.round(w * .013)}px system-ui, sans-serif`;
    ctx.letterSpacing = `${Math.round(w * .004)}px`;
    ctx.fillText('A DAY BY SHINOTSU LAKE', 0, 0);
    ctx.restore();

    if (status) status.textContent = `${size.label} · ${place || 'しのつ公園'} · 端末内で生成`;
  };

  triggerButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.fileTarget;
      document.querySelector<HTMLInputElement>(`#${target}`)?.click();
    });
  });

  fileInputs.forEach((input) => {
    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        if (status) status.textContent = '画像ファイルを選んでください。';
        return;
      }
      if (file.size > 25 * 1024 * 1024) {
        if (status) status.textContent = '25MB以下の画像を選んでください。';
        return;
      }
      try {
        if (status) status.textContent = '写真を端末内で読み込んでいます…';
        const next = await loadPhoto(file);
        photo?.cleanup?.();
        photo = next;
        render();
      } catch {
        if (status) status.textContent = '写真を読み込めませんでした。別の画像をお試しください。';
      } finally {
        input.value = '';
      }
    });
  });

  sizeRadios.forEach((radio) => radio.addEventListener('change', () => { selectedSize = radio.value as CardSize; render(); }));
  styleRadios.forEach((radio) => radio.addEventListener('change', () => { selectedStyle = radio.value as CardStyle; render(); }));
  placeInput?.addEventListener('input', render);
  dateInput?.addEventListener('input', render);

  downloadButton?.addEventListener('click', () => {
    canvas.toBlob((blob) => {
      if (!blob) {
        if (status) status.textContent = '保存用画像を作成できませんでした。';
        return;
      }
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      const safeDate = (dateInput?.value || formatDate()).replace(/[^0-9A-Za-z._-]/g, '-');
      anchor.href = url;
      anchor.download = `shinotsu-memory-${safeDate}.png`;
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      if (status) status.textContent = '記念カードを保存しました。写真は送信されていません。';
    }, 'image/png', 1);
  });

  window.addEventListener('pagehide', () => photo?.cleanup?.(), { once: true });
  render();
}
