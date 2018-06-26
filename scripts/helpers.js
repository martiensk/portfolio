/**
 * @param {HTMLElement} el The element that you want the CSS selector for.
 * @returns {string} The full CSS selector.
 */
export const CSSPath = (el) => {
    let done = false;
    let fullPath = '';
    while (!done) {
        const result = TestPath(el, fullPath);
        fullPath = result.path;
        if (result.done) {
            done = !done;
        } else {
            el = result.elem;
        }
    }
    return fullPath;
};

/**
 * @param {HTMLElement} el The element that you want the CSS selector for.
 * @param {string} path The current CSS selector.
 * @returns {string} A partial CSS selector.
 */
const TestPath = (el, path) => {
    if (el.tagName === null) {
        return path;
    }

    let elPath = '';
    elPath = el.tagName.toLowerCase();

    if (el.id !== '') {
        elPath += el.id;
    }

    for (const c of el.classList) {
        elPath += `.${c}`;
    }

    path = `${elPath} ${path}`;

    if (el.parentElement !== null) {
        return {
            done: false,
            path,
            elem: el.parentElement
        };
    }
    return {
        done: true,
        path
    };
};
