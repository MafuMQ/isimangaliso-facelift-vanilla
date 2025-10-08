// Simple client-side include injector for header and footer fragments
async function loadInclude(selector, url) {
    try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error('Failed to load ' + url);
        const text = await resp.text();
        document.querySelector(selector).innerHTML = text;
    } catch (err) {
        console.error('Include load error:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // places pages will have placeholders with IDs 'include-header' and 'include-footer'
    const headerHolder = document.getElementById('include-header');
    const footerHolder = document.getElementById('include-footer');
    if (headerHolder) loadInclude('#include-header', 'includes/header.html');
    if (footerHolder) loadInclude('#include-footer', 'includes/footer.html');
});
