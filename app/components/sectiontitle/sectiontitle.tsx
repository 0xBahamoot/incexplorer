import { Title } from '@mantine/core';
import React, { FunctionComponent } from 'react'




type Props = {
    text: any
}

const SectionTitle: FunctionComponent<Props> = ({ text }) => {
    return (
        <Title order={3} style={{ color: '#fff', letterSpacing: "0.01em", fontStyle: 'normal', fontWeight: 500, fontSize: 26 }}>{text}</Title>
    );
}

export default SectionTitle;