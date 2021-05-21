import { GlobalContext } from '../contexts/GlobalContext';
import { makeStyles, Typography } from '@material-ui/core'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import OutlinedInput from '@material-ui/core/OutlinedInput'

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: '86vh',
    }
})

export default function TodoList() {

    const classes = useStyles()
    

    return (
        <GlobalContext.Consumer>
        {(context) => {
            const currentList = context.todoLists[context.menuSelectedIndex]
            const columns = [`${currentList.charAt(0).toUpperCase() + currentList.slice(1)} #`, "Title", "Acceptance", "Difficulty", "Done", "Review", "Comment"]
            return  (
                <div>
                    <TableContainer component={Paper} className={classes.container}>
                        <Table stickyHeader size="small" aria-label="a dense table">
                        <colgroup>
                            <col style={{width:'10%'}}/>
                            <col style={{width:'20%'}}/>
                            <col style={{width:'10%'}}/>
                            <col style={{width:'10%'}}/>
                            <col style={{width:'5%'}}/>
                            <col style={{width:'5%'}}/>
                            <col style={{width:'50%'}}/>
                        </colgroup>
                        <TableHead>
                            <TableRow>
                            {
                                columns.map((column, i) => (
                                    <TableCell key={i}>
                                        {column}
                                    </TableCell>
                                ))
                            }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { context.data !== null ? context.data.map((row, i) => (
                                <TableRow key={i}>
                                {
                                    row.map((column, j) => (
                                    <TableCell key={`${i},${j}`} onDoubleClick={(e) => context.updateEditable(i)} onKeyDown={(e) => {if (e.metaKey && e.keyCode === 13 ) {context.updateEditable(i); context.updateQuestion(e, i, j, true)}}}>
                                        {j === 4 ? <Checkbox type="checkbox" checked={column} onChange={(e) => context.updateQuestion(e, i, j, true)} /> : 

                                        j === 5 ? <Checkbox type="checkbox" checked={column} onChange={(e) => context.updateQuestion(e, i, j, true)} /> :

                                        j === 6 ? 
                                                    !context.editable[i] ? (<Typography >{column}</Typography>) : (
                                                        <OutlinedInput
                                                        fullWidth
                                                        multiline
                                                        defaultValue={column}
                                                        className={classes.outlinedInput}
                                                        />
                                                    ) :
                                        
                                        j === 1 ? <a target='__blank' style={{ textDecoration: 'none', color: context.prefersDarkMode ? 'white' : 'black' }} href={`https://leetcode.com/problems/${column.toLowerCase().split(' ').join('-')}/`}>{column}</a>: 
                                        
                                        j === 0 ? `${i} (${column})` : column
                                        
                                        }
                                    </TableCell>
                                    ))
                                }
                                </TableRow>
                            )) : <TableRow />}
                        </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )
        }}
        </GlobalContext.Consumer>
    )
}


