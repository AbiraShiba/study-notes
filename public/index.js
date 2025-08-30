"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function loadNotes() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("notes.json");
        const notes = yield res.json();
        const categories = Array.from(new Set(notes.map(n => n.category)));
        const tabsEl = document.getElementById("tabs");
        const notesEl = document.getElementById("notes");
        const filterEl = document.getElementById("filter");
        let activeCategory = null;
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
    });
}
loadNotes();
