// Bíðum eftir að síðan hlaðist alveg
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('timeline-container');
    const infoBox = document.getElementById('info-box');

    // 1. Sækja gögnin úr JSON skránni
    fetch('gislasaga.json')
        .then(response => response.json())
        .then(data => {
            renderTimeline(data.timallina);
        })
        .catch(error => console.error('Villa við að sækja gögn:', error));

    // 2. Teikna tímalínuna á skjáinn
    function renderTimeline(chapters) {
        chapters.forEach((chapter) => {
            // Búa til punkt á tímalínunni
            const dot = document.createElement('div');
            dot.className = 'timeline-dot';
            dot.style.backgroundColor = chapter.litakodi; // Nota litinn úr JSON
            
            // Búa til titil fyrir neðan punktinn
            const label = document.createElement('span');
            label.innerText = chapter.id;
            dot.appendChild(label);

            // Músa-yfir (Hover) virkni
            dot.addEventListener('mouseenter', (e) => {
                showInfo(chapter, e);
            });

            dot.addEventListener('mouseleave', () => {
                infoBox.classList.add('hidden');
            });

            container.appendChild(dot);
        });
    }

    // 3. Birta upplýsingarnar í popup glugganum
    function showInfo(chapter, event) {
        // Búa til textann fyrir fólk og staði
        let personurHTML = chapter.metadata.personur.map(p => 
            `<li><strong style="color:${p.litur}">${p.nafn}</strong>: ${p.hlutverk}</li>`
        ).join('');

        let stadirHTML = chapter.metadata.stadir.map(s => 
            `<li><strong>${s.nafn}</strong>: ${s.lysing}</li>`
        ).join('');

        // Setja innihald í info-boxið
        infoBox.innerHTML = `
            <h3>${chapter.titill}</h3>
            <p><em>Spennustig: ${chapter.spennustig}/10</em></p>
            <p>${chapter.samantekt}</p>
            <hr>
            <h4>Persónur:</h4>
            <ul>${personurHTML}</ul>
            <h4>Staðir:</h4>
            <ul>${stadirHTML}</ul>
        `;

        // Staðsetja gluggann nálægt músinni
        infoBox.style.left = (event.pageX + 20) + 'px';
        infoBox.style.top = (event.pageY - 50) + 'px';
        
        infoBox.classList.remove('hidden');
    }
});