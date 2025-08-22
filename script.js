/* ========= Helpers ========= */
const $ = (s, scope=document) => scope.querySelector(s);
const $$ = (s, scope=document) => Array.from(scope.querySelectorAll(s));

function openModal({img, title, price='—', desc='—'}) {
  $('#mImg').src = img;
  $('#mTitle').textContent = title;
  $('#mPrice').textContent = price;
  $('#mDesc').textContent = desc;
  $('#detailModal').style.display = 'grid';
}
function closeModal(){ $('#detailModal').style.display='none'; }
$('#modalClose').addEventListener('click', closeModal);
window.addEventListener('click', (e)=>{ if(e.target.id==='detailModal') closeModal(); });

/* ========= Data (Picsum fixed IDs for reliable images) ========= */
const categories = [
  { icon:'👔', label:'SHIRTS' },
  { icon:'👖', label:'JEANS' },
  { icon:'👕', label:'TSHIRTS' },
  { icon:'👟', label:'CASUAL SHOES' },
  { icon:'🥇', label:'SPORTS SHOES' },
  { icon:'🧥', label:'KURTA SETS' },
  { icon:'👚', label:'TOPS' },
  { icon:'🧵', label:'KURTAS' },
];

const heroCards = [
  { title:'Buy 3, Save 10%', desc:'Level Up Deals • Glitch Fest', img:'https://picsum.photos/id/1027/800/500' },
  { title:'Street Fits', desc:'Oversized tees & cargos', img:'https://picsum.photos/id/1031/800/500' },
  { title:'Trendy Co-ords', desc:'Sets under ₹999', img:'https://picsum.photos/id/1025/800/500' },
];

const offers = [
  { title:'Price', desc:'Best picks', img:'https://picsum.photos/id/1060/400/300' },
  { title:'fwd Under ₹999', desc:'LAKME & more', img:'https://picsum.photos/id/1062/400/300' },
  { title:'Beauty Under ₹999', desc:'Top brands', img:'https://picsum.photos/id/1080/400/300' },
  { title:'Flat 80% Off', desc:'Limited time', img:'https://picsum.photos/id/1070/400/300' },
];

const fwdItems = [
  { title:'Oversized Tee', price:'₹599', desc:'Graphic print', img:'https://picsum.photos/id/1005/600/700' },
  { title:'Wide-leg Jeans', price:'₹1,199', desc:'Washed blue', img:'https://picsum.photos/id/1011/600/700' },
  { title:'Cargo Pants', price:'₹999', desc:'Utility pockets', img:'https://picsum.photos/id/1018/600/700' },
  { title:'Skater Sneaks', price:'₹1,399', desc:'Street-ready', img:'https://picsum.photos/id/1020/600/700' },
];

const beautyItems = [
  { title:'Lakme Lipstick', price:'₹349', desc:'Matte finish', img:'https://picsum.photos/id/1067/600/700' },
  { title:'Face Serum', price:'₹599', desc:'Glow boost', img:'https://picsum.photos/id/1069/600/700' },
  { title:'Kajal Duo', price:'₹249', desc:'Smudge proof', img:'https://picsum.photos/id/1074/600/700' },
  { title:'Nail Kit', price:'₹299', desc:'Trendy shades', img:'https://picsum.photos/id/1084/600/700' },
];

/* ========= Renderers ========= */
// Categories
const catStrip = $('#catStrip');
categories.forEach((c, i)=>{
  const el = document.createElement('button');
  el.className = 'cat' + (i===0 ? ' active' : '');
  el.innerHTML = `<div class="ic">${c.icon}</div><small>${c.label}</small>`;
  el.addEventListener('click', ()=>{
    $$('.cat', catStrip).forEach(x=>x.classList.remove('active'));
    el.classList.add('active');
    openModal({img:'https://picsum.photos/id/1059/800/500', title:c.label, desc:'Browse curated picks from '+c.label});
  });
  catStrip.appendChild(el);
});

// Hero
const heroWrap = $('#heroWrap');
const heroGrid = document.createElement('div');
heroGrid.className = 'hero-grid';
heroCards.forEach(card=>{
  const h = document.createElement('div');
  h.className = 'hero-card';
  h.innerHTML = `
    <img src="${card.img}" alt="${card.title}">
    <span class="label">${card.title}</span>
  `;
  h.addEventListener('click', ()=>openModal({img:card.img, title:card.title, desc:card.desc}));
  heroGrid.appendChild(h);
});
heroWrap.appendChild(heroGrid);

// Offers
const offersRow = $('#offersRow');
offers.forEach(o=>{
  const el = document.createElement('article');
  el.className = 'offer';
  el.innerHTML = `
    <img src="${o.img}" alt="${o.title}">
    <div class="cap"><strong>${o.title}</strong>${o.desc?`<div>${o.desc}</div>`:''}</div>
  `;
  el.addEventListener('click', ()=>openModal({img:o.img, title:o.title, desc:o.desc}));
  offersRow.appendChild(el);
});

// fwd grid
const fwdGrid = $('#fwdGrid');
fwdItems.forEach(it=>{
  const c = document.createElement('article');
  c.className = 'card';
  c.innerHTML = `
    <img src="${it.img}" alt="${it.title}">
    <div class="body">
      <div class="title">${it.title}</div>
      <div class="price">${it.price}</div>
    </div>
  `;
  c.addEventListener('click', ()=>openModal(it));
  fwdGrid.appendChild(c);
});

// beauty grid
const beautyGrid = $('#beautyGrid');
beautyItems.forEach(it=>{
  const c = document.createElement('article');
  c.className = 'card';
  c.innerHTML = `
    <img src="${it.img}" alt="${it.title}">
    <div class="body">
      <div class="title">${it.title}</div>
      <div class="price">${it.price}</div>
    </div>
  `;
  c.addEventListener('click', ()=>openModal(it));
  beautyGrid.appendChild(c);
});

/* ========= Search (filters visible cards by title) ========= */
$('#searchInput').addEventListener('input', (e)=>{
  const q = e.target.value.toLowerCase();

  // Filter Home hero labels & offers by title
  $$('.hero-card', heroWrap).forEach((node, idx)=>{
    const t = heroCards[idx].title.toLowerCase();
    node.style.display = t.includes(q) ? '' : 'none';
  });
  $$('#offersRow .offer').forEach((node, idx)=>{
    const t = offers[idx].title.toLowerCase();
    node.style.display = t.includes(q) ? '' : 'none';
  });

  // Filter fwd & beauty items
  [ [fwdGrid, fwdItems], [beautyGrid, beautyItems] ].forEach(([grid, data])=>{
    $$('.card', grid).forEach((node, idx)=>{
      const t = data[idx].title.toLowerCase();
      node.style.display = t.includes(q) ? '' : 'none';
    });
  });
});

/* ========= Bottom Nav (SPA switch) ========= */
const pages = $$('.page');
const bnItems = $$('.bn-item');
function showPage(sel){
  pages.forEach(p=>p.classList.remove('active'));
  $(sel).classList.add('active');
  bnItems.forEach(b=>b.classList.toggle('active', b.dataset.goto===sel));
  // Auto scroll to top on page switch
  window.scrollTo({top:0, behavior:'smooth'});
}
bnItems.forEach(btn=>{
  btn.addEventListener('click', ()=> showPage(btn.dataset.goto));
});
