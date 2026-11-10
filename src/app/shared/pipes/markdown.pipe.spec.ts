import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { MarkdownPipe } from './markdown.pipe';

describe('MarkdownPipe', () => {
  let pipe: MarkdownPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkdownPipe],
    });
    pipe = TestBed.inject(MarkdownPipe);
  });

  it('should create an instance of MarkdownPipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for null, undefined, or empty input', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform('')).toBe('');
  });

  it('should parse bold and italic markdown', () => {
    const result = pipe.transform('**strong text** and *italic text*') as string;
    expect(result).toContain('<strong class="font-bold');
    expect(result).toContain('strong text</strong>');
    expect(result).toContain('<em class="italic">italic text</em>');
  });

  it('should parse headings', () => {
    const h1 = pipe.transform('# Heading 1') as string;
    const h2 = pipe.transform('## Heading 2') as string;
    const h3 = pipe.transform('### Heading 3') as string;

    expect(h1).toContain('<h2');
    expect(h1).toContain('Heading 1</h2>');
    expect(h2).toContain('<h3');
    expect(h2).toContain('Heading 2</h3>');
    expect(h3).toContain('<h4');
    expect(h3).toContain('Heading 3</h4>');
  });

  it('should parse inline code and code blocks', () => {
    const inlineResult = pipe.transform('Use `npm install` to setup') as string;
    expect(inlineResult).toContain('<code');
    expect(inlineResult).toContain('npm install</code>');

    const blockResult = pipe.transform('```typescript\nconst foo = "bar";\n```') as string;
    expect(blockResult).toContain('<pre');
    expect(blockResult).toContain('<code>const foo =');
  });

  it('should parse checkboxes and lists', () => {
    const checked = pipe.transform('- [x] Done task') as string;
    expect(checked).toContain('line-through');
    expect(checked).toContain('Done task');

    const unchecked = pipe.transform('- [ ] Pending task') as string;
    expect(unchecked).toContain('Pending task');

    const list = pipe.transform('* List item 1\n* List item 2') as string;
    expect(list).toContain('<li class="ml-4 list-disc');
    expect(list).toContain('List item 1</li>');
  });

  it('should parse links with target blank and rel attributes', () => {
    const result = pipe.transform('[Official Site](https://example.com)') as string;
    expect(result).toContain('href="https://example.com"');
    expect(result).toContain('target="_blank"');
    expect(result).toContain('rel="noopener noreferrer"');
    expect(result).toContain('Official Site');
  });

  it('should parse blockquotes', () => {
    const result = pipe.transform('> This is an important quote') as string;
    expect(result).toContain('<blockquote');
    expect(result).toContain('This is an important quote</blockquote>');
  });

  it('should sanitize raw HTML script tags to prevent XSS injection', () => {
    const result = pipe.transform('<script>alert("hacked")</script>') as string;
    expect(result).not.toContain('<script>');
    expect(result).not.toContain('alert');
  });

  it('should sanitize inline event handlers such as onerror and onclick', () => {
    const result = pipe.transform('<img src="invalid-image" onerror="alert(1)">') as string;
    expect(result).not.toContain('onerror');
    expect(result).not.toContain('alert(1)');
  });

  it('should sanitize iframe tags', () => {
    const result = pipe.transform('<iframe src="https://malicious.com"></iframe>') as string;
    expect(result).not.toContain('<iframe');
    expect(result).not.toContain('malicious.com');
  });

  it('should neutralize javascript: and data: pseudo-protocols in markdown links', () => {
    const jsResult = pipe.transform('[Click here](javascript:alert("XSS"))') as string;
    expect(jsResult).not.toContain('href="javascript:');
    expect(jsResult).toContain('href="#"');

    const dataResult = pipe.transform('[Data link](data:text/html,<script>alert(1)</script>)') as string;
    expect(dataResult).not.toContain('href="data:');
    expect(dataResult).toContain('href="#"');
  });

  it('should preserve legitimate links with http, https, mailto, and relative paths', () => {
    const httpsResult = pipe.transform('[Google](https://google.com)') as string;
    expect(httpsResult).toContain('href="https://google.com"');

    const httpResult = pipe.transform('[Localhost](http://localhost:4200)') as string;
    expect(httpResult).toContain('href="http://localhost:4200"');

    const mailtoResult = pipe.transform('[Email Team](mailto:team@company.com)') as string;
    expect(mailtoResult).toContain('href="mailto:team@company.com"');

    const relativeResult = pipe.transform('[Internal Tasks](/tasks)') as string;
    expect(relativeResult).toContain('href="/tasks"');
  });
});
