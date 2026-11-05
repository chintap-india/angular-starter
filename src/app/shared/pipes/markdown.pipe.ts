import { Pipe, PipeTransform, inject, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'markdown',
  standalone: true,
})
export class MarkdownPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(value: string | null | undefined): SafeHtml {
    if (!value) return '';

    const html = this.parseMarkdown(value);
    return this.sanitizer.sanitize(SecurityContext.HTML, html) || '';
  }

  private parseMarkdown(md: string): string {
    // 1. Normalize line endings
    let text = md.replace(/\r\n/g, '\n');

    // 2. Fenced code blocks
    text = text.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const escaped = this.escapeHtml(code.trim());
      return `<pre class="my-3 p-3.5 rounded-xl bg-stone-900 text-stone-100 font-mono text-xs overflow-x-auto border border-stone-800"><code>${escaped}</code></pre>`;
    });

    // 3. Inline code
    text = text.replace(/`([^`]+)`/g, (_, code) => {
      return `<code class="px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-emerald-600 dark:text-emerald-400 font-mono text-xs border border-stone-200 dark:border-stone-700">${this.escapeHtml(code)}</code>`;
    });

    // 4. Headings
    text = text.replace(/^### (.*$)/gim, '<h4 class="text-base font-bold text-stone-900 dark:text-stone-100 mt-4 mb-2 tracking-tight">$1</h4>');
    text = text.replace(/^## (.*$)/gim, '<h3 class="text-lg font-bold text-stone-900 dark:text-stone-100 mt-5 mb-2.5 tracking-tight">$1</h3>');
    text = text.replace(/^# (.*$)/gim, '<h2 class="text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-6 mb-3 tracking-tight">$1</h2>');

    // 5. Blockquotes
    text = text.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-emerald-500 pl-3.5 my-3 italic text-stone-600 dark:text-stone-300 text-sm">$1</blockquote>');

    // 6. Checkboxes: - [x] or - [ ]
    text = text.replace(/^- \[x\] (.*$)/gim, '<div class="flex items-center gap-2 my-1 text-sm text-stone-500 line-through"><span class="w-4 h-4 rounded bg-emerald-500 text-white flex items-center justify-center text-[10px]">✓</span><span>$1</span></div>');
    text = text.replace(/^- \[ \] (.*$)/gim, '<div class="flex items-center gap-2 my-1 text-sm text-stone-700 dark:text-stone-300"><span class="w-4 h-4 rounded border border-stone-300 dark:border-stone-600 inline-block"></span><span>$1</span></div>');

    // 7. Unordered Lists
    text = text.replace(/^[*-] (.*$)/gim, '<li class="ml-4 list-disc text-sm text-stone-700 dark:text-stone-300 my-1">$1</li>');

    // 8. Bold & Italic
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-stone-900 dark:text-white">$1</strong>');
    text = text.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

    // 9. Links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-emerald-600 dark:text-emerald-400 font-semibold underline hover:text-emerald-500 transition">$1 ↗</a>');

    // 10. Paragraphs / line breaks
    text = text.replace(/\n\n+/g, '</p><p class="my-2.5 text-stone-700 dark:text-stone-300 leading-relaxed text-sm">');
    text = `<p class="my-2.5 text-stone-700 dark:text-stone-300 leading-relaxed text-sm">${text}</p>`;

    return text;
  }

  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
