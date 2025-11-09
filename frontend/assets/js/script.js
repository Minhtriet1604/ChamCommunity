// Hàm chung để fetch dữ liệu từ backend
async function fetchData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

    
// Hamburger menu cho mobile (an toàn cho mọi trang)

document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu
  const navToggle = document.getElementById('navToggle');
  const mainMenu = document.getElementById('mainMenu');
  if (navToggle && mainMenu) {
    navToggle.addEventListener('click', function() {
      mainMenu.classList.toggle('open');
    });
    navToggle.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' || e.key === ' ') mainMenu.classList.toggle('open');
    });
  }
  // Shop page
  if (typeof initShopPage === 'function') {
    initShopPage();
  }
});


  const swiper = new Swiper('.mySwiper', {
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    autoplay: { delay: 3500, disableOnInteraction: false },
    effect: 'fade',
    loop: true
  });
  // loadNews('news-container'); // Đã tắt để giữ nội dung tĩnh


// Tải tin tức
async function loadNews(containerId, isDetail = false, id = null) {
  const url = isDetail ? `http://localhost/backend/api/news.php?id=${id}` : 'http://localhost/backend/api/news.php';
  const news = await fetchData(url);
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  if (isDetail) {
    if (news) {
      container.innerHTML = `
        <h2 class="text-3xl font-bold mb-4 animate__animated animate__fadeIn">${news.title}</h2>
        <img src="${news.image}" alt="${news.title}" class="w-full h-96 object-cover mb-4 rounded card">
        <p class="text-gray-600 mb-4">${new Date(news.date).toLocaleDateString()}</p>
        <p class="text-lg">${news.content}</p>
      `;
    }
  } else {
    news.forEach(item => {
      const div = document.createElement('div');
      div.className = 'bg-white p-4 rounded shadow card animate__animated animate__fadeInUp';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover rounded">
        <h3 class="text-xl font-semibold mt-2">${item.title}</h3>
        <p class="text-gray-600">${new Date(item.date).toLocaleDateString()}</p>
        <a href="news-detail.html?id=${item.id}" class="text-blue-600 hover:underline">Đọc thêm <i class="fas fa-arrow-right"></i></a>
      `;
      container.appendChild(div);
    });
  }
}

// Tải forum
async function loadForum() {
  const posts = await fetchData('http://localhost/backend/api/forum.php');
  const container = document.getElementById('forum-posts');
  container.innerHTML = '';
  posts.forEach(post => {
    const div = document.createElement('div');
    div.className = 'bg-white p-4 rounded shadow card mb-4 animate__animated animate__fadeIn';
    div.innerHTML = `
      <h3 class="text-xl font-semibold">${post.title}</h3>
      <p class="text-gray-600">By ${post.user} on ${new Date(post.created_at).toLocaleDateString()}</p>
      <p>${post.content}</p>
      <div class="mt-4">
        <h4 class="font-semibold">Bình luận:</h4>
        ${post.comments.map(c => `<p class="text-gray-600">${c.user}: ${c.text}</p>`).join('')}
        <input type="text" placeholder="Viết bình luận" class="w-full p-2 mt-2 border rounded" data-post-id="${post.id}">
        <button class="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700" onclick="addComment(${post.id})">Gửi <i class="fas fa-paper-plane"></i></button>
      </div>
    `;
    container.appendChild(div);
  });
}

async function addPost() {
  const title = document.getElementById('post-title').value;
  const content = document.getElementById('post-content').value;
  const user = 'Guest';
  await fetch('http://localhost/backend/api/forum.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, user })
  });
  loadForum();
}

async function addComment(postId) {
  const input = document.querySelector(`input[data-post-id="${postId}"]`);
  const text = input.value;
  const user = 'Guest';
  await fetch(`http://localhost/backend/api/forum.php?id=${postId}&comment=true`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, text })
  });
  loadForum();
}

async function submitContact() {
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const message = document.getElementById('contact-message').value;
  await fetch('http://localhost/backend/api/contact.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
  });
  alert('Gửi thành công!');
}

// Khởi tạo lịch Chăm
function initCalendar() {
  var calendarEl = document.getElementById('calendar');
  if (calendarEl) {
    var calendar = new FullCalendar.Calendar(calendarEl, {
      locale: 'vi',
      firstDay: 1, // Bắt đầu từ thứ 2
      initialView: 'dayGridMonth',
      initialDate: new Date(),
      buttonText: { today: 'Hôm nay' },
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listWeek'
      },
      editable: false,
      events: [
        {
          title: 'Tết Ramưwan (Người Chăm Bani)',
          start: '2025-02-28',
          end: '2025-03-30', // Ramadan kéo dài 1 tháng
          description: 'Lễ hội Ramadan của người Chăm Bani theo Hồi giáo, cầu nguyện tổ tiên và thực hiện I\'tikaf tại mosque.',
          color: '#fbbf24' // Vàng
        },
        {
          title: 'Lễ Katê - múa tại sân banh các Palei',
          start: '2025-10-20',
          end: '2025-10-20',
          description: 'Lễ hội lớn nhất của người Chăm, với múa, nhạc saranai và trống paranung.',
          color: '#1d4ed8' // Xanh
        },
              {
          title: 'Lễ Katê - Mở cửa Tháp',
          start: '2025-10-21',
          end: '2025-10-21',
          description: 'Lễ hội lớn nhất của người Chăm, tổ chức tại các Tháp Poklong Garai, Porome,... để tôn vinh các vị thần vương.',
          color: '#1d4ed8' // Xanh
        },
        {
          title: 'Tết Dương Lịch',
          start: '2025-01-01',
          description: 'Ngày lễ chung, nhiều cộng đồng Chăm tổ chức giao lưu văn hóa.',
          color: '#10b981' // Xanh lá
        }
      ],
      eventClick: function(info) {
        alert(info.event.title + '\n' + info.event.extendedProps.description);
      }
    });
    calendar.render();
  }
}


// SHOP PAGE: Gom toàn bộ logic vào một hàm duy nhất, gọi khi DOMContentLoaded
function initShopPage() {
  const shopProducts = document.getElementById('shop-products');
  const searchInput = document.getElementById('searchInput');
  const categorySelect = document.getElementById('categorySelect');
  if (!shopProducts || !searchInput || !categorySelect) return;
  const products = [
    { id: 1, name: 'Áo nam ngắn tay Chăm(Nguồn: Thu Hiền/fanpage FB: Trang phục, phụ kiện Chăm)', category: 'ao', img: '/frontend/anh/áo nam.jpg', price: '250.000đ' },
    { id: 2, name: 'Áo nam ngắn tay Chăm(Nguồn: Thu Hiền/fanpage FB: Trang phục, phụ kiện Chăm)', category: 'ao', img: '/frontend/anh/nam 2.jpg', price: '250.000đ' },
    { id: 4, name: 'Áo dài nữ Chăm(Nguồn: Thu Hiền/fanpage FB: Trang phục, phụ kiện Chăm)', category: 'ao', img: '/frontend/anh/nữ 1.jpg', price: 'xxx.000đ' },
    { id: 5, name: 'Áo dài nữ Chăm(Nguồn: Thu Hiền/fanpage FB: Trang phục, phụ kiện Chăm)', category: 'ao', img: '/frontend/anh/nữ 2.jpg', price: 'xxx.000đ' },
    { id: 6, name: 'Áo dài nữ Chăm(Nguồn: Thu Hiền/fanpage FB: Trang phục, phụ kiện Chăm)', category: 'ao', img: '/frontend/anh/nữ 3.jpg', price: 'xxx.000đ' },
    { id: 7, name: 'Áo dài nữ Chăm(Nguồn: Thu Hiền/fanpage FB: Trang phục, phụ kiện Chăm)', category: 'ao', img: '/frontend/anh/nữ 4.jpg', price: 'xxx.000đ' },
    { id: 8, name: 'Bông tai Chăm(Nguồn: Thu Hiền/fanpage FB: Trang phục, phụ kiện Chăm)', category: 'trangsuc', img: '/frontend/anh/bông tai 2.jpg', price: '49.000đ' },
    { id: 9, name: 'Cài tóc xinh(Nguồn: Thu Hiền/fanpage FB: Trang phục, phụ kiện Chăm)', category: 'trangsuc', img: '/frontend/anh/cột tóc.jpg', price: '169.000đ' },
    { id: 10, name: 'Bình gốm Bàu Trúc', category: 'gom', img: '/frontend/anh/gốm.jpg', price: 'xxx.000đ' },
    { id: 11, name: 'Tượng tháp Chăm mini', category: 'gom', img: '/frontend/anh/tháp.jpg', price: 'xxx.000đ' },
    { id: 12, name: 'Bộ ấm chén gốm', category: 'gom', img: '/frontend/anh/ấm.jpg', price: 'xxx.000đ' },
    { id: 15, name: 'Sách nghệ thuật Chăm Pa', category: 'sach', img: '/frontend/anh/sách 2.jpg', price: '120.000đ' },
    { id: 16, name: 'Sách người Chăm xưa & nay', category: 'sach', img: '/frontend/anh/sách 1.jpg', price: '95.000đ' }
  ];
  function renderProducts(list) {
    shopProducts.innerHTML = '';
    if (list.length === 0) {
      shopProducts.innerHTML = '<div class="col-span-full text-center text-gray-500">Không tìm thấy sản phẩm phù hợp.</div>';
      return;
    }
    list.forEach(p => {
      shopProducts.innerHTML += `
        <div class="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center hover:shadow-2xl transition">
          <img src="${p.img}" alt="${p.name}" class="w-40 h-40 object-cover rounded mb-3 border-2 border-blue-100 hover:border-blue-400 transition">
          <h3 class="font-semibold text-lg mb-1 text-center">${p.name}</h3>
          <div class="text-blue-600 font-bold mb-2">${p.price}</div>
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Mua ngay</button>
        </div>
      `;
    });
  }
  function filterProducts() {
    const search = searchInput.value.toLowerCase();
    const cat = categorySelect.value;
    let filtered = products.filter(p =>
      (cat === 'tatca' || p.category === cat) &&
      p.name.toLowerCase().includes(search)
    );
    renderProducts(filtered);
  }
  searchInput.addEventListener('input', filterProducts);
  categorySelect.addEventListener('change', filterProducts);
  renderProducts(products);
}
document.addEventListener('DOMContentLoaded', initShopPage);
