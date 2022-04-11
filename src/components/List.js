import { useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';

import Snackbar from '@mui/material/Snackbar';

import SignatureImg from './SignatureImg';
import TimeStamps from './TimeStamps';
import TableToolbar from './TableToolbar';

function List(props) {
  // const [sig, setSig] = useState([]);

  const handleClose = () => {
    props.setOpen(false);
  };

  const [components] = useState({
    'signatureImgComponent': SignatureImg
  })

  const rowDataGetter = (params) => {
    return params.data;
  };

  const toolbarDataGetter = (params) => {
    params.data.setOpen = props.setOpen
    params.data.setMsg = props.setMsg
    params.data.sig = props.allSignatures
    params.data.setSig = props.setAllSignatures
    return params.data
  }

  const getRowHeight = useCallback((params) => {
    return params.data.rowHeight;
  }, [])

  function dateComparator(date1, date2) {
    if (date1.signed_at > date2.signed_at) {
      return 1
    } else {
      return -1
    }
  }

  /**
   * When a user click on a row to display in a view the content 
   */
  function onRowClicked(e) {
    try {
      if (e.data === undefined) {
        alert(
          'Could not open the signature'
        )
      } else {
        props.setShowOneSig(e.data)
      }

    } catch (error) {
      console.log(error)
      alert(
        'Could not open the signature: ', error
      )
    }

  }

  const columns = [
    {
      headerName: 'UUID',
      field: 'id',
      sortable: true,
      filter: true,
      width: 150,
    },
    {
      headerName: 'Image',
      cellRenderer: SignatureImg,
      valueGetter: rowDataGetter,
      sortable: false,
      filter: false,
      width: 220
    },
    {
      headerName: 'Pickup date',
      cellRenderer: TimeStamps,
      valueGetter: rowDataGetter,
      comparator: dateComparator,
      sortable: true,
      filter: 'agDateColumnFilter',
      filterParams: {
        // provide comparator function
        //https://www.ag-grid.com/react-data-grid/filter-date/
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          const dateAsString = cellValue.signed_at;
          console.log(dateAsString);

          if (dateAsString == null) {
            return 0;
          }

          const cellDate = new Date(dateAsString);

          // Now that both parameters are Date objects, we can compare
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
          return 0;
        }
      },
      width: 150,
    },
    {
      headerName: '',
      width: 70,
      cellRenderer: TableToolbar,
      valueGetter: toolbarDataGetter
    }
  ];

  return (
    <div>
      {props.showAllSig === true && (
        <div className="ag-theme-alpine" style={{ height: 500, width: 600 }}>
          <AgGridReact
            rowData={props.allSignatures}
            onRowClicked={(e) => onRowClicked(e)}
            components={components}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={10}
            suppressCellFocus={true}
            animateRows={true}
            getRowHeight={getRowHeight}
          />

          <Snackbar
            open={props.open}
            message={props.AgGridReactmsg}
            autoHideDuration={9000}
            onClose={handleClose}
          />
        </div>
      )}
    </div>
  );
}

export default List;
