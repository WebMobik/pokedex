import React from 'react';
import { PokeServiceConsumer } from '../pokemon-service-context'

const withPokeapiService = (mapMethodsToProps) => (Wrapped) => {
    return (props) => {
        return (
            <PokeServiceConsumer>
                {
                    (pokeapiService) => {
                        const serviceProps = mapMethodsToProps(pokeapiService);

                        return (
                            <Wrapped {...props} {...serviceProps} />
                        )
                    }
                }
            </PokeServiceConsumer>
        )
    }
}

export default withPokeapiService;