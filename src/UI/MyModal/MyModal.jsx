import React, { useContext } from 'react';
import AddComp from '../../components/AddComp';
import UpdateComp from '../../components/UpdateComp';
import { VisibleContext } from '../../context';
import cl from "./MyModal.module.css"

const MyModal = ({children, add, ongoing}) => {
    const { modal } = useContext(VisibleContext);
    const rootClasses = [cl.myModal]

    if (modal) {
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')}>
            <div className={cl.myModalContent}>
                {children}
                {
                    add
                    ?
                    <AddComp />
                    :
                    <UpdateComp/>
                }
            </div>
        </div>
    );
};

export default MyModal;