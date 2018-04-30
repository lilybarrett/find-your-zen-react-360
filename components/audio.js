import React from 'react';
import { Sound } from 'react-vr';
import zens from '../consts/zens.js';
import { compose } from 'recompose';
import { asset } from 'react-vr';
import { hideIf, usingAppContext } from '../providers/index.js';

const hideIfNoAudioUrl = hideIf(({ selectedZen }) => {
    const zenAudio = zens[selectedZen - 1].audio;
    return zenAudio === null || zenAudio === undefined || zenAudio.length === 0;
});

export default compose(
    usingAppContext,
    hideIfNoAudioUrl,
)(({ selectedZen }) => {
    const zenAudio = zens[selectedZen - 1].audio;
    return (
        <Sound source={asset(zenAudio)} />
    )
});
