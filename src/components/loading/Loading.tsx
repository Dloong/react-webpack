import React from 'react';
import { Box } from '@material-ui/core';

import './LoadingStyle.scss';

function Loading(): any {
    return (
        <Box className="loading_page_wraper">
            <div className="boxes">
                <div className="box">
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
                <div className="box">
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
                <div className="box">
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
                <div className="box">
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        </Box>
    );
}
export default Loading;
