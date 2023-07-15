import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Button, ButtonGroup } from '@material-ui/core';
import { FormatBold, FormatItalic, FormatUnderlined, Code, FormatQuote, FormatListBulleted, FormatListNumbered } from '@material-ui/icons';

const styles = theme => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    minHeight: theme.spacing(10),
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: theme.shape.borderRadius,
    '& .public-DraftEditorPlaceholder-root': {
      position: 'absolute',
      color: 'rgba(0, 0, 0, 0.38)',
      zIndex: -1,
    },
    '& .public-DraftEditor-content': {
      minHeight: theme.spacing(10),
    },
  },
  buttonGroup: {
    marginRight: theme.spacing(1),
  },
});

const MUIRichTextEditor = ({ defaultValue, onChange, onSave, classes, props }) => {
  const [editorState, setEditorState] = useState(() => {
    if (defaultValue) {
      return EditorState.createWithContent(convertFromRaw(JSON.parse(defaultValue)));
    }
    return EditorState.createEmpty();
  });

  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  const handleEditorChange = (state) => {
    setEditorState(state);
    if (onChange) {
      const contentState = state.getCurrentContent();
      const contentStateJson = JSON.stringify(convertToRaw(contentState));
      onChange(contentStateJson);
    }
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleEditorChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const handleSaveClick = () => {
    if (onSave) {
      const contentState = editorState.getCurrentContent();
      const contentStateJson = JSON.stringify(convertToRaw(contentState));
      onSave(contentStateJson);
    }
  };

  const handleBoldClick = () => {
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const handleItalicClick = () => {
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const handleUnderlineClick = () => {
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  const handleCodeClick = () => {
    handleEditorChange(RichUtils.toggleCode(editorState));
  };

  const handleQuoteClick = () => {
    handleEditorChange(RichUtils.toggleBlockType(editorState, 'blockquote'));
  };

  const handleUnorderedListClick = () => {
    handleEditorChange(RichUtils.toggleBlockType(editorState, 'unordered-list-item'));
  };

  const handleOrderedListClick = () => {
    handleEditorChange(RichUtils.toggleBlockType(editorState, 'ordered-list-item'));
  };

  return (
    <Paper className={classes.root}>
      <Editor
        ref={editorRef}
        editorState={editorState}
        onChange={handleEditorChange}
        handleKeyCommand={handleKeyCommand}
        {...props}
      />
      <ButtonGroup className={classes.buttonGroup}>
        <Button onClick={handleBoldClick}><FormatBold /></Button>
        <Button onClick={handleItalicClick}><FormatItalic /></Button>
        <Button onClick={handleUnderlineClick}><FormatUnderlined /></Button>
        <Button onClick={handleCodeClick}><Code /></Button>
        <Button onClick={handleQuoteClick}><FormatQuote /></Button>
        <Button onClick={handleUnorderedListClick}><FormatListBulleted /></Button>
        <Button onClick={handleOrderedListClick}><FormatListNumbered /></Button>
      </ButtonGroup>
      {onSave && <Button onClick={handleSaveClick}>Save</Button>}
    </Paper>
  );
};

MUIRichTextEditor.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MUIRichTextEditor);
