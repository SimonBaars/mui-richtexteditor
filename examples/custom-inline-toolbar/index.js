import React from 'react';
import MUIRichTextEditor from '../../';
import InvertColorsIcon from '@mui/icons-material/InvertColors';

const save = (data) => {
    console.log(data);
};

const CustomInlineToolbar = () => {
    return (
        <MUIRichTextEditor
            label="Try selecting some text to show the inline toolbar..."
            inlineToolbar={true}
            inlineToolbarControls={["bold", "italic", "my-style", "link"]}
            onSave={save}
            customControls={[
                {
                    name: "my-style",
                    icon: <InvertColorsIcon />,
                    type: "inline",
                    inlineStyle: {
                        backgroundColor: "black",
                        color: "white"
                    }
                }
            ]}
        />
    );
};

export default CustomInlineToolbar;
