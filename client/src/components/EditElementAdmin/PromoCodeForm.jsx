import { useState } from "react";
import EditProductAdminStyle from "./EditProductAdmin.module.scss";

const PromoCodeForm = () => {
    const [promoCodes, setPromoCodes] = useState([]);
    const [newCode, setNewCode] = useState('');
    const [newValue, setNewValue] = useState('');

    const handleCodeChange = (e) => {
        setNewCode(e.target.value);
    };

    const handleValueChange = (e) => {
        setNewValue(e.target.value);
    };

    const handleAddCode = () => {
        if (newCode && newValue) {
            setPromoCodes([...promoCodes, { name: newCode, value: newValue }]);
            setNewCode('');
            setNewValue('');
        }
    };

    const handleRemoveCode = (index) => {
        const updatedCodes = [...promoCodes];
        updatedCodes.splice(index, 1);
        setPromoCodes(updatedCodes);
    };

    return (
        <>
            <label className={EditProductAdminStyle.EditProductCodePromoContainer}>Ajouter un code de promotion
                <div className={EditProductAdminStyle.EditProductCodePromo}>
                    <input type="text" value={newCode} onChange={handleCodeChange} placeholder="Code promo" />
                    <input className={EditProductAdminStyle.EditProductCodePromoInputValue} type="text" value={newValue} onChange={handleValueChange} placeholder="15%" />
                    <button className={EditProductAdminStyle.EditProductCodePromoBtn} onClick={handleAddCode}>Ajouter</button>
                </div>
                <div>
                    <ul>
                        {promoCodes.map((code, index) => (
                            <li key={index}>
                                {code.name} - {code.value}%
                                <button onClick={() => handleRemoveCode(index)}>Supprimer</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </label>
        </>
    );
};

export default PromoCodeForm;