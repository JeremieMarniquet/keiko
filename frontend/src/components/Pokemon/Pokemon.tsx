import * as React from 'react';

interface Props {
    name: string;
    id: number;
}

class Pokemon extends React.Component<Props> {
    render(): React.ReactNode {
        const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.id}.png`;

        return (
            <>
                <div>{this.props.name}</div>
                <div>{this.props.id}</div>
                <img src={url} width="50" height="50" />
            </>
        );
    }
}

export default Pokemon;
