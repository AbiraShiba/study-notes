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
        const listEl = document.getElementById("notes");
        const filterEl = document.getElementById("filter");
        let activeCategory = null;
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
    });
}
loadNotes();
