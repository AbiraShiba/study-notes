interface Note {
    title: string;
    file: string;
    tags: string[];
    category: string;
}

async function loadNotes() {
    const res = await fetch("notes.json");
    const notes: Note[] = await res.json();

    const categories = Array.from(new Set(notes.map(n => n.category)));
    const tabsEl = document.getElementById("tabs")!;
    const listEl = document.getElementById("notes")!;
    const filterEl = document.getElementById("filter")! as HTMLInputElement;

    let activeCategory: string | null = null;

    // タブを生成
    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.addEventListener("click", () => {
            activeCategory = cat;
            render();
        });
        tabsEl.appendChild(btn);
    });

    function render() {
        listEl.innerHTML = "";
        notes
            .filter(n => (!activeCategory || n.category === activeCategory))
            .filter(n => {
                const f = filterEl.value.toLowerCase();
                return !f || n.tags.some(t => t.toLowerCase().includes(f));
            })
            .forEach(n => {
                const li = document.createElement("li");
                li.innerHTML = `<a href="${n.file}" target="_blank">${n.title}</a> [${n.tags.join(", ")}]`;
                listEl.appendChild(li);
            });
    }

    filterEl.addEventListener("input", render);
    render();
}

loadNotes();
