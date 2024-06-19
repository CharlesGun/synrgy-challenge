function DeleteBox({onCancelButtonClick, onConfirmDeleteButtonClick}) {
  return (
    <div className="overlay-dialog">
        <div className="dialog-box bg-white d-flex flex-column justify-content-center align-items-center w-25">
            <div className="mb-4">
                <img src="/public/images/dialog.png" alt="broom"/>
            </div>
            <div className="w-75 mx-auto text-center">
                <p className="fw-bold">Menghapus Data Mobil</p>
                <p>Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin menghapus?</p>
            </div>
            <div className="w-100 d-flex justify-content-center mb-2 gap-5">
                <button className="dialect-button button-yes w-25 fw-bold" onClick={onConfirmDeleteButtonClick}>Ya</button>
                <button className="dialect-button button-no w-25 fw-bold" onClick={onCancelButtonClick}>Tidak</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteBox

