// AEA Apprenticeship Funding Finder
// Static site — all data loaded from grants.json

let grantsData = null;
let currentState = null;
let showVeteran = false;
let activeFilter = 'all';

const US_STATES = {
    AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',
    CO:'Colorado',CT:'Connecticut',DE:'Delaware',FL:'Florida',GA:'Georgia',
    HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',
    KS:'Kansas',KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',
    MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',MS:'Mississippi',MO:'Missouri',
    MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',
    NM:'New Mexico',NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',
    OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',SC:'South Carolina',
    SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',
    VA:'Virginia',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming'
};

// Init
document.addEventListener('DOMContentLoaded', async () => {
    // Load data
    const resp = await fetch('data/grants.json');
    grantsData = await resp.json();
    
    // Populate state dropdown
    const select = document.getElementById('stateSelect');
    Object.entries(US_STATES).sort((a,b) => a[1].localeCompare(b[1])).forEach(([code, name]) => {
        const opt = document.createElement('option');
        opt.value = code;
        opt.textContent = name;
        // Mark states with specific programs
        if (grantsData.state[code]) {
            opt.textContent += ' ★';
        }
        select.appendChild(opt);
    });
    
    // Events
    select.addEventListener('change', (e) => {
        if (e.target.value) {
            currentState = e.target.value;
            showResults();
        }
    });
    
    document.getElementById('veteranToggle').addEventListener('change', (e) => {
        showVeteran = e.target.checked;
        if (currentState) showResults();
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.dataset.filter;
            renderPrograms();
        });
    });
    
    // Modal close on backdrop
    document.getElementById('detailModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal();
    });
    
    // Last updated
    document.getElementById('lastUpdated').textContent = grantsData.lastUpdated;
});

function getPrograms() {
    let programs = [];
    
    // Federal programs
    grantsData.federal.forEach(p => {
        if (!showVeteran && p.veteranOnly) return;
        programs.push({...p, source: 'federal'});
    });
    
    // State programs
    const stateData = grantsData.state[currentState];
    if (stateData) {
        stateData.programs.forEach(p => {
            programs.push({
                ...p,
                level: 'state',
                source: 'state',
                categories: p.taxCredit ? ['tax-credit'] : ['training'],
                difficulty: p.confidence === 'high' ? 'easy' : 'moderate',
                whoQualifies: `Employers in ${stateData.name} with registered apprenticeships.`,
                howToApply: `Visit the program website or contact your state workforce agency.`,
                requiresRA: true,
                veteranOnly: false,
                deadline: 'Ongoing',
                proTip: stateData.notes || ''
            });
        });
    }
    
    // Add WIOA note for states without specific programs
    if (!stateData) {
        programs.push({
            id: 'state-wioa-note',
            name: `${US_STATES[currentState]} Workforce Programs`,
            agency: `${US_STATES[currentState]} Workforce Agency`,
            amount: 'Varies — WIOA and state grants',
            description: `While ${US_STATES[currentState]} may not have a dedicated apprenticeship tax credit, your local American Job Center can connect you with WIOA-funded OJT reimbursements, training grants, and employer support services. Every state has these.`,
            level: 'state',
            source: 'state',
            categories: ['training', 'wages'],
            difficulty: 'moderate',
            url: 'https://www.careeronestop.org/LocalHelp/AmericanJobCenters/find-american-job-centers.aspx',
            requiresRA: false,
            veteranOnly: false,
            deadline: 'Ongoing',
            whoQualifies: 'Any employer working with their local workforce board.',
            howToApply: 'Contact your local American Job Center.',
            proTip: "Don't assume your state has nothing just because there's no tax credit. Workforce boards have money to spend and targets to hit. Call them."
        });
    }
    
    return programs;
}

function showResults() {
    document.getElementById('stateSelection').classList.add('hidden');
    document.getElementById('resultsDashboard').classList.remove('hidden');
    document.getElementById('stateName').textContent = US_STATES[currentState];
    
    renderPrograms();
    renderStacking();
    updateSummary();
}

function renderPrograms() {
    const grid = document.getElementById('programGrid');
    const programs = getPrograms();
    
    const filtered = activeFilter === 'all' 
        ? programs 
        : programs.filter(p => p.categories && p.categories.includes(activeFilter));
    
    grid.innerHTML = filtered.map(p => `
        <div class="program-card ${p.veteranOnly ? 'veteran-only' : ''}" onclick="showDetail('${p.id}')">
            <div class="card-level">${p.level || p.source} program</div>
            <h4>${p.name}</h4>
            <div class="card-amount">${p.amount}</div>
            <div class="card-desc">${p.amountNote || p.description}</div>
            <div class="card-tags">
                ${getDifficultyTag(p.difficulty)}
                ${p.veteranOnly ? '<span class="tag tag-veteran">🎖️ Veteran</span>' : ''}
                ${p.flag ? '<span class="tag tag-flag">⚠️ Verify</span>' : ''}
                ${p.requiresRA ? '<span class="tag" style="background:#e8e0f0;color:#4a2d7a">Requires RA</span>' : ''}
            </div>
            <span class="card-difficulty">${getDifficultyDot(p.difficulty)}</span>
        </div>
    `).join('');
}

function getDifficultyTag(d) {
    const map = {
        easy: '<span class="tag tag-easy">✅ Easy</span>',
        moderate: '<span class="tag tag-moderate">⚡ Moderate</span>',
        complex: '<span class="tag tag-complex">🔴 Complex</span>',
        'n/a': '<span class="tag" style="background:#eee;color:#666">Proposed</span>'
    };
    return map[d] || '';
}

function getDifficultyDot(d) {
    const map = { easy: '🟢', moderate: '🟡', complex: '🔴', 'n/a': '⚪' };
    return map[d] || '';
}

function updateSummary() {
    const programs = getPrograms();
    document.getElementById('totalPrograms').textContent = programs.length;
    document.getElementById('easyCount').textContent = programs.filter(p => p.difficulty === 'easy').length;
    
    // Estimate total value (rough)
    let estimate = 0;
    const stateData = grantsData.state[currentState];
    
    // Always count WIOA
    estimate += 12000; // ~50% wage reimbursement estimate
    
    // State tax credits
    if (stateData && stateData.taxCredit) {
        const match = stateData.taxCredit.match(/\$([\d,]+)/);
        if (match) estimate += parseInt(match[1].replace(',', ''));
    }
    
    // Veteran programs
    if (showVeteran) {
        estimate += 24000; // GI Bill estimate
        estimate += 15000; // SkillBridge estimate (half year)
        estimate += 4000;  // COOL
    }
    
    const formatted = estimate >= 1000 
        ? '$' + Math.round(estimate/1000) + ',000+' 
        : '$' + estimate;
    
    document.getElementById('totalValue').textContent = formatted;
    document.getElementById('headerTotal').textContent = formatted;
}

function renderStacking() {
    const section = document.getElementById('stackingSection');
    const cards = document.getElementById('stackingCards');
    
    // Find matching stacking examples
    const stateData = grantsData.state[currentState];
    let examples = grantsData.stackingExamples;
    
    if (!showVeteran) {
        examples = examples.filter(e => !e.scenario.toLowerCase().includes('veteran'));
    }
    
    if (examples.length === 0) {
        section.classList.add('hidden');
        return;
    }
    
    section.classList.remove('hidden');
    cards.innerHTML = examples.map(ex => {
        const items = ex.yearOne || ex.fiveYear || [];
        return `
            <div class="stack-card">
                <h4>📊 ${ex.scenario}</h4>
                <table class="stack-table">
                    <thead><tr><th>Program</th><th>Amount</th><th>Paid To</th></tr></thead>
                    <tbody>
                        ${items.map(i => `<tr><td>${i.program}</td><td><strong>${i.amount}</strong></td><td>${i.paidTo}</td></tr>`).join('')}
                    </tbody>
                </table>
                <div class="stack-total">Total: ${ex.totalValue}</div>
            </div>
        `;
    }).join('');
}

function showDetail(id) {
    const allPrograms = [...grantsData.federal, ...(grantsData.state[currentState]?.programs || [])];
    const program = allPrograms.find(p => p.id === id);
    if (!program) return;
    
    const modal = document.getElementById('detailModal');
    const body = document.getElementById('modalBody');
    
    body.innerHTML = `
        <h3>${program.name}</h3>
        <div class="modal-amount">${program.amount}</div>
        ${program.amountNote ? `<p style="color:var(--text-secondary);margin-bottom:1.5rem">${program.amountNote}</p>` : ''}
        
        <div class="modal-section">
            <h4>What Is This?</h4>
            <p>${program.description}</p>
        </div>
        
        ${program.whoQualifies ? `
        <div class="modal-section">
            <h4>Who Qualifies?</h4>
            <p>${program.whoQualifies}</p>
        </div>
        ` : ''}
        
        ${program.howToApply ? `
        <div class="modal-section">
            <h4>How to Apply</h4>
            <p>${program.howToApply}</p>
        </div>
        ` : ''}
        
        ${program.agency ? `
        <div class="modal-section">
            <h4>Administering Agency</h4>
            <p>${program.agency}</p>
        </div>
        ` : ''}
        
        ${program.proTip ? `
        <div class="modal-protip">
            <h4>💡 Pro Tip</h4>
            <p>${program.proTip}</p>
        </div>
        ` : ''}
        
        ${program.flag ? `
        <div class="modal-flag">
            <h4>⚠️ Verification Needed</h4>
            <p>${program.flag}</p>
        </div>
        ` : ''}
        
        ${program.url ? `<a href="${program.url}" target="_blank" class="modal-link">Visit Official Source →</a>` : ''}
    `;
    
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('detailModal').classList.add('hidden');
}

function resetState() {
    currentState = null;
    document.getElementById('stateSelect').value = '';
    document.getElementById('resultsDashboard').classList.add('hidden');
    document.getElementById('stateSelection').classList.remove('hidden');
    document.getElementById('headerTotal').textContent = '$0';
    activeFilter = 'all';
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
}

// Keyboard close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});
