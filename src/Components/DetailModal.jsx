import { Box, Typography, Modal } from '@mui/material';

// Style for Modal
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display:'flex', flexDirection:'column',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid white',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

// Capitalize string
function capitalizeFirstLetter(sentence) {
    if (typeof sentence === 'string')
        return sentence[0].toUpperCase() + sentence.slice(1);
    return sentence
}

// Params: openDetail:object, setOpenDetail:function, label:string, data:object
function DetailModal({ openDetail, setOpenDetail, label }) {
    return (
        <Modal
            open={openDetail.status}
            onClose={() => setOpenDetail({ status:false, data:{} }) }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} border='none'>
                <Box>
                    <Typography id="modal-modal-title" variant="h5" component="h5" color="#cf253a">
                        {label}
                    </Typography>
                </Box>
                <Box sx={{ display:"flex", flexDirection:"row" }}>
                    <Box sx={{ display:"flex", flexDirection:"column" }}>
                        {Object.keys(openDetail.data).map((item, index) => {
                            return (
                                <Typography key={index} variant="p" sx={{ m:"2px 10px"}}>{capitalizeFirstLetter(item)}</Typography>
                            )
                        })}
                    </Box>
                    
                    <Box sx={{ display:"flex", flexDirection:"column" }}>
                        {Object.values(openDetail.data).map((item, index) => {
                            return (
                                <Typography key={index} variant="p" sx={{ m:"2px 10px"}}>{capitalizeFirstLetter(item)}</Typography>
                            )
                        })}
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default DetailModal