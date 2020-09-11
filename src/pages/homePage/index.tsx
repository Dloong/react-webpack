import React from 'react';
import AppBar from "./AppBar"
import Welecome from "./Welecome"

export default function Home(): React.ReactElement {

    // const { t } = useTranslation();
    return (
        <div>
            <AppBar />
            <Welecome />
        </div>
    );
}
