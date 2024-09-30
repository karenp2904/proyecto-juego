import React, { useState } from 'react';
import './ItemBag.css'; // Estilos CSS

type Item = {
    id: string;
    name: string;
    imageUrl: string;
};

const inventoryItems: Item[] = [
    { id: '1', name: 'CoronaDeHielo', imageUrl: '../assets/Images/CoronaDeHielo.png' },
    { id: '2', name: 'MagmaArdiente', imageUrl: '../assets/Images/MagmaArdiente.png' },
    { id: '3', name: 'EspadaDeUnaMano', imageUrl: '/Images/EspadaDeUnaMano.png' },
    { id: '4', name: 'DagaPurulenta', imageUrl: '/Images/DagaPurulenta.png' },
    { id: '5', name: 'EspadaDeDosManos', imageUrl: '/Images/EspadaDeDosManos.png' },
    { id: '6', name: 'SierraSangrienta', imageUrl: '/Images/SierraSangrienta.png' },
    { id: '7', name: 'EscudoDeDragon', imageUrl: '/Images/EscudoDeDragon.png' },
    { id: '8', name: 'EmpunaduraDeFuria', imageUrl: '/Images/EmpunaduraDeFuria.png' },
    { id: '9', name: 'PinchosDeEscudo', imageUrl: '/Images/PinchosDeEscudo.png' },
    { id: '8', name: 'EmpunaduraDeFuria', imageUrl: '/Images/EmpunaduraDeFuria.png' },
    { id: '9', name: 'PinchosDeEscudo', imageUrl: '/Images/PinchosDeEscudo.png' },
];


const getImagePath = (itemName: string): string => {
    const formattedName = itemName.toLowerCase().replace(/\s+/g, '-');
    return `/Images/${formattedName}.png`; // Ruta directa a la carpeta 'public'
};

const ItemBag: React.FC = () => {
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);

    const handleSelectItem = (item: Item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem.id !== item.id));
            console.log(item.imageUrl)
        } else if (selectedItems.length < 8) {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const handleSaveItems = () => {
        console.log('Productos seleccionados:', selectedItems);

        // Aquí puedes agregar la lógica para guardar los ítems seleccionados (API o localStorage)
    };
    return (
        <div className="fondoBag">
            <div className="inventory-container">
                <div className="inventory-section">
                    <h3 className="inventory-title">Inventario de Armas</h3>
                    <div className="weapon-grid">
                        {inventoryItems.map(item => (
                            <div
                                key={item.id}
                                className={`weapon-card ${selectedItems.includes(item) ? 'weapon-selected' : ''}`}
                                onClick={() => handleSelectItem(item)}
                            >
                                <img src={getImagePath(item.name)} alt={item.name} className="weapon-image" />
                                <h4 className="weapon-name">{item.name}</h4>
                            </div>
                        ))}
                    </div>
                </div>
        
                <div className="selected-section">
                    <h3 className="selected-title">Productos Seleccionados ({selectedItems.length}/8)</h3>
                    <div className="selected-grid">
                        {selectedItems.map(item => (
                            <div key={item.id} className="selected-card">
                                <img src={getImagePath(item.name)} alt={item.name} className="selected-image" />
                                <h4 className="selected-name">{item.name}</h4>
                            </div>
                        ))}
                    </div>
        
                    <button
                        className="action-button"
                        onClick={handleSaveItems}
                        disabled={selectedItems.length > 8}
                    >
                        Guardar Selección
                    </button>
                </div>
            </div>
        </div>
       
    );
    
}
    
export default ItemBag;
