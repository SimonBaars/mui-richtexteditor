import {
    Modifier,
    SelectionState,
    getVisibleSelectionRect,
} from 'draft-js';

/**
 * Type definitions
 */
export const atomicBlockExists = (name, controls) => {
    if (!controls) {
        return undefined;
    }
    return controls.find(
        (control) =>
            control.type === 'atomic' &&
            control.name === name &&
            control.atomicComponent !== undefined
    );
};

export const isGreaterThan = (value, maxValue) => {
    if (!maxValue) {
        return false;
    }
    return value > maxValue;
};

export const getLineNumber = (editorState) => {
    const currentBlockKey = editorState.getSelection().getStartKey();
    return editorState
        .getCurrentContent()
        .getBlockMap()
        .keySeq()
        .findIndex((k) => k === currentBlockKey);
};

/**
 * Get the current selection details
 */
export const getSelectionInfo = (editorState) => {
    const selection = editorState.getSelection();
    const startOffset = selection.getStartOffset();
    const currentContent = editorState.getCurrentContent();
    const contentBlock = currentContent.getBlockForKey(selection.getStartKey());
    const currentStyle = editorState.getCurrentInlineStyle();
    const linkKey = contentBlock.getEntityAt(startOffset);
    let entityType = '';
    if (linkKey) {
        const linkInstance = currentContent.getEntity(linkKey);
        entityType = linkInstance.getType();
    }
    return {
        inlineStyle: currentStyle,
        blockType: contentBlock.getType(),
        entityType: entityType,
        linkKey: linkKey,
        block: contentBlock
    };
};

/**
 * Remove a block from the ContentState
 */
export const removeBlockFromMap = (editorState, block) => {
    const contentState = editorState.getCurrentContent();
    const removeBlockContentState = Modifier.removeRange(
        contentState,
        new SelectionState({
            anchorKey: block.getKey(),
            anchorOffset: 0,
            focusKey: block.getKey(),
            focusOffset: block.getLength()
        }),
        'backward'
    );
    const blockMap = removeBlockContentState.getBlockMap().delete(block.getKey());
    return removeBlockContentState.merge({
        blockMap,
        selectionAfter: contentState.getSelectionAfter()
    });
};

/**
 * Clear inline styles
 */
export const clearInlineStyles = (editorState, customStyles) => {
    let styles = ['BOLD', 'ITALIC', 'UNDERLINE'];
    if (customStyles) {
        styles = styles.concat(Object.getOwnPropertyNames(customStyles));
    }
    return styles.reduce(
        (newContentState, style) =>
            Modifier.removeInlineStyle(newContentState, editorState.getSelection(), style),
        editorState.getCurrentContent()
    );
};

/**
 * Get editor bounds
 */
export const getEditorBounds = (editor) => {
    const fakeClientRect = getVisibleSelectionRect(window);
    return {
        selectionRect: fakeClientRect
            ? {
                  top: fakeClientRect.top,
                  left: fakeClientRect.left
              }
            : null,
        editorRect: editor.getBoundingClientRect()
    };
};
