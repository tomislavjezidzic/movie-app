import { Fragment } from 'react';

const ReplaceTranslation = ({ value, data }) => {
    const re = new RegExp(/(__[A-z0-9]+__)/, 'g');
    const newArray = value.split(re);

    Object.keys(data).forEach(key => {
        if (typeof data[key] !== 'undefined') {
            const index = newArray.findIndex(item => item === key);
            if (index > -1) newArray[index] = data[key];
        }
    });

    if (newArray?.length < 1) return null;

    return newArray.map((item, i) => <Fragment key={`translation--${i}`}>{item}</Fragment>);
};

export default ReplaceTranslation;
