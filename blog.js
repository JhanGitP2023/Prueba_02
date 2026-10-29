
        (() => {
            const storageKey = 'floresMedellinExperiences';
            const form = document.getElementById('experienceForm');
            const list = document.getElementById('experienceList');
            const status = document.getElementById('experienceStatus');

            const getExperiences = () => {
                try {
                    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
                    return Array.isArray(saved) ? saved : [];
                } catch {
                    return [];
                }
            };

            const renderExperiences = () => {
                const experiences = getExperiences();
                list.replaceChildren();
                if (experiences.length === 0) {
                    const emptyMessage = document.createElement('p');
                    emptyMessage.textContent = 'Aún no hay experiencias publicadas. ¡Sé la primera persona en compartir!';
                    list.appendChild(emptyMessage);
                    return;
                }

                experiences.forEach((experience) => {
                    const card = document.createElement('article');
                    card.className = 'card';
                    const body = document.createElement('div');
                    body.className = 'card-body';
                    const title = document.createElement('h4');
                    title.textContent = experience.title;
                    const story = document.createElement('p');
                    story.textContent = experience.story;
                    const author = document.createElement('p');
                    author.className = 'card-price';
                    author.textContent = `Compartido por ${experience.name}`;
                    body.append(title, story, author);
                    card.appendChild(body);
                    list.appendChild(card);
                });
            };

            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const data = new FormData(form);
                const experience = {
                    name: data.get('name').trim(),
                    title: data.get('title').trim(),
                    story: data.get('story').trim()
                };

                if (!experience.name || !experience.title || !experience.story) return;
                const experiences = getExperiences();
                experiences.unshift(experience);
                try {
                    localStorage.setItem(storageKey, JSON.stringify(experiences));
                    form.reset();
                    status.textContent = '¡Tu experiencia se publicó en este navegador!';
                    renderExperiences();
                } catch {
                    status.textContent = 'No se pudo guardar la publicación en este navegador.';
                }
            });

            renderExperiences();
        })();
  