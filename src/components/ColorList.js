import React, { useState } from 'react'
import axiosWithAuth from '../helpers/axiosWithAuth'
import EditMenu from './EditMenu'
const initialColor = {
    color: '',
    code: { hex: '' }
}

const ColorList = ({ colors, updateColors }) => {
    const [editing, setEditing] = useState(false)
    const [colorToEdit, setColorToEdit] = useState(initialColor)

    const editColor = (color) => {
        setEditing(true)
        setColorToEdit(color)
    }

    const saveEdit = (e) => {
        e.preventDefault()
        axiosWithAuth()
            .put(
                `http://localhost:3000/api/colors/${colorToEdit.id}`,
                colorToEdit
            )
            .then((res) => {
                setEditing(false)
                updateColors(
                    colors.map((color) => {
                        return color.id === colorToEdit.id ? res.data : color
                    })
                )
            })
    }

    const deleteColor = (color) => {
        axiosWithAuth()
            .delete(`http://localhost:3000/api/colors/${color.id}`)
            .then((res) => {
                updateColors(
                    colors
                        .filter((colorItem) => {
                            return colorItem.id !== color.id
                        })
                        .catch((err) =>
                            console.error('Error Deleteing Color', err)
                        )
                )
            })
    }

    return (
        <div className="colors-wrap">
            <p>colors</p>
            <ul>
                {colors.map((color) => (
                    <li key={color.color} onClick={() => editColor(color)}>
                        <span>
                            <span
                                className="delete"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    deleteColor(color)
                                }}
                            >
                                x
                            </span>{' '}
                            {color.color}
                        </span>
                        <div
                            className="color-box"
                            style={{ backgroundColor: color.code.hex }}
                        />
                    </li>
                ))}
            </ul>
            {editing && (
                <EditMenu
                    colorToEdit={colorToEdit}
                    saveEdit={saveEdit}
                    setColorToEdit={setColorToEdit}
                    setEditing={setEditing}
                />
            )}
        </div>
    )
}

export default ColorList;

