import { GlobalContext } from '../contexts/GlobalContext';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

export default function Landing() {

    const history = useHistory()

    return (
        <GlobalContext.Consumer>
        {(context) => {
            return  (
                <div>
                    <Typography variant='h5'>
                        TODO Lists
                    </Typography>
                    <hr></hr>
                    <List>
                        {context.todoLists.map((item, index) => (
                        <ListItem 
                            button 
                            key={index} 
                            onClick={(event) => {context.handleTodoClick(event, index); history.push('/list')}}
                        >
                            <ListItemText primary={item.charAt(0).toUpperCase() + item.slice(1)} />
                        </ListItem>
                        ))}
                    </List>
                </div>
            )
        }}
        </GlobalContext.Consumer>
    )
}


