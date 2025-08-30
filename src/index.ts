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
    const notesEl = document.getElementById("notes")!;
    const filterEl = document.getElementById("filter")! as HTMLInputElement;

    let activeCategory: string | null = null;

    // カテゴリタブ
    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.className =
            "px-3 py-1 border rounded hover:bg-blue-100";
        btn.addEventListener("click", () => {
            activeCategory = cat === activeCategory ? null : cat;
            render();
        });
        tabsEl.appendChild(btn);
    });

    // 表示更新
    function render() {
        notesEl.innerHTML = "";
        const filter = filterEl.value.toLowerCase();

        notes
            .filter(n => !activeCategory || n.category === activeCategory)
            .filter(n => !filter || n.tags.some(t => t.toLowerCase().includes(filter)))
            .forEach(n => {
                const card = document.createElement("div");
                card.className =
                    "bg-white p-4 rounded-lg shadow hover:shadow-md transition";

                card.innerHTML = `
          <h2 class="text-lg font-semibold mb-2">${n.title}</h2>
          <p class="text-sm text-gray-600 mb-2">Tags: ${n.tags.join(", ")}</p>
          <a href="${n.file}" target="_blank"
             class="inline-block px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700">
             PDF を開く
          </a>
        `;
                notesEl.appendChild(card);
            });
    }

    filterEl.addEventListener("input", render);
    render();
}

loadNotes();
