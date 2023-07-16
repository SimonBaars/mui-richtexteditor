import React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import MUIRichTextEditor, { TAutocompleteItem } from '../../';

const save = (data) => {
    console.log(data);
};

const cities = [
    {
        keys: ["mexico"],
        value: {
            name: "Mexico City",
            image: "🇲🇽"
        },
        content: "Mexico City",
    },
    {
        keys: ["mexico", "beach"],
        value: {
            name: "Cancun",
            image: "🚩"
        },
        content: "Cancun",
    },
    {
        keys: ["japan", "olympics"],
        value: {
            name: "Tokyo",
            image: "🇯🇵"
        },
        content: "Tokyo",
    },
    {
        keys: ["japan"],
        value: {
            name: "Osaka",
            image: "🏁"
        },
        content: "Osaka",
    }
];

const CityChip = (props) => {
    const { blockProps } = props;
    const { value } = blockProps; // Get the value provided in the TAutocompleteItem[]

    const handleClick = () => {
        console.log(value.name);
    };

    return (
        <Chip
            avatar={<Avatar>{value.image}</Avatar>}
            label={value.name}
            onClick={handleClick}
        />
    );
};

const AutocompleteAtomic = () => {
    return (
        <MUIRichTextEditor
            label="Try typing '/mexico'..."
            onSave={save}
            customControls={[
                {
                    name: "my-city",
                    type: "atomic",
                    atomicComponent: CityChip
                },
            ]}
            autocomplete={{
                strategies: [
                    {
                        items: cities,
                        triggerChar: "/",
                        atomicBlockName: "my-city"
                    }
                ]
            }}
        />
    );
};

export default AutocompleteAtomic;
