import React from 'react';
import { Box } from '@material-ui/core';
import './LoadingStyle.scss';
import LoadingContent from "./Loading"


function Loading(): React.ReactElement {
    return (
        <Box className="loading_page_wraper">
            <LoadingContent />
        </Box>
    );
}
export default Loading;
