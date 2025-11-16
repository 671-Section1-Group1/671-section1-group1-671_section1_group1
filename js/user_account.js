// โหลดผู้ใช้งานทั้งหมด
async function loadUsers() {
  const res = await fetch("/api/admin/users");
  const data = await res.json();

  const table = document.getElementById("userTable");
  table.innerHTML = "";

  data.forEach(user => {
    table.innerHTML += `
      <tr>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>${user.status}</td>
        <td>
          <button class="btn-edit" onclick="editUser(${user.id})">Edit</button>
          <button class="btn-delete" onclick="deleteUser(${user.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Add new user
document.getElementById("addUserBtn").addEventListener("click", async () => {
  const firstName = prompt("ชื่อจริง:");
  const lastName = prompt("นามสกุล:");
  const email = prompt("อีเมล:");
  const password = prompt("รหัสผ่าน:");
  const role = prompt("บทบาท (Admin/Staff/User):");

  const res = await fetch("/admin/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, password, role })
  });

  const data = await res.json();
  alert(data.message);
  loadUsers();
});

// Edit user
async function editUser(id) {
  const firstName = prompt("ชื่อใหม่:");
  const lastName = prompt("นามสกุลใหม่:");
  const role = prompt("บทบาทใหม่:");
  const status = prompt("สถานะใหม่ (Active/Inactive):");

  const res = await fetch(`/admin/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, role, status })
  });

  const data = await res.json();
  alert(data.message);
  loadUsers();
}

// Delete user
async function deleteUser(id) {
  if (confirm("ต้องการลบผู้ใช้งานนี้หรือไม่?")) {
    const res = await fetch(`/admin/users/${id}`, { method: "DELETE" });
    const data = await res.json();
    alert(data.message);
    loadUsers();
  }
}

// Reset search
function resetSearch() {
  document.getElementById("searchFname").value = "";
  document.getElementById("searchLname").value = "";
  document.getElementById("searchEmail").value = "";
  loadUsers();
}

// Search
async function searchUser() {
  const fname = document.getElementById("searchFname").value;
  const lname = document.getElementById("searchLname").value;
  const email = document.getElementById("searchEmail").value;

  const res = await fetch(`/api/admin/users/search?fname=${fname}&lname=${lname}&email=${email}`);
  const data = await res.json();

  const table = document.getElementById("userTable");
  table.innerHTML = "";

  data.forEach(user => {
    table.innerHTML += `
      <tr>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>${user.status}</td>
        <td>
          <button class="btn-edit" onclick="editUser(${user.id})">Edit</button>
          <button class="btn-delete" onclick="deleteUser(${user.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

loadUsers();
