document.addEventListener('DOMContentLoaded', async () => {
    // Fetch team members data
    const teamMembers = await fetchTeamMembers();
    renderTeamMembers(teamMembers);
    setupModalListeners();
});

async function fetchTeamMembers() {
    try {
        const response = await fetch('/api/team/members');
        if (!response.ok) {
            throw new Error('Failed to fetch team members');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

function renderTeamMembers(members) {
    const teamGrid = document.querySelector('.team-grid');
    teamGrid.innerHTML = members.map(member => `
        <div class="team-member" data-id="${member.id}">
            <div class="profile-photo">
                <img src="${member.image_url}" alt="${member.name}">
            </div>
            <div class="member-info">
                <h3>${member.name}</h3>
                <p class="position">${member.position}</p>
                <div class="social-links">
                    <a href="#" class="social-link chat-link" data-id="${member.id}">
                        <i class="fa-solid fa-comment"></i>
                    </a>
                    <a href="${member.instagram}" class="social-link" target="_blank">
                        <i class="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
        </div>
    `).join('');

    // Add click listeners to chat icons
    document.querySelectorAll('.chat-link').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const memberId = e.currentTarget.dataset.id;
            const contactInfo = await fetchContactInfo(memberId);
            showContactModal(contactInfo);
        });
    });
}

async function fetchContactInfo(memberId) {
    try {
        const response = await fetch(`/api/team/contact/${memberId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch contact information');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

function showContactModal(contactInfo) {
    if (!contactInfo) return;

    const modal = document.getElementById('contactModal');
    const contactInfoDiv = document.getElementById('contactInfo');
    
    contactInfoDiv.innerHTML = `
        <p><strong>Email:</strong> ${contactInfo.email}</p>
        <p><strong>Phone:</strong> ${contactInfo.phone}</p>
        <p><strong>Line ID:</strong> ${contactInfo.line_id}</p>
        <p><strong>Office Hours:</strong> ${contactInfo.office_hours}</p>
    `;
    
    modal.style.display = 'block';
}

function setupModalListeners() {
    const modal = document.getElementById('contactModal');
    const closeBtn = document.querySelector('.close');

    closeBtn.onclick = () => modal.style.display = 'none';
    
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}