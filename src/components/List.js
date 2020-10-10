import React from 'react';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Sort, Toolbar } from '@syncfusion/ej2-react-grids';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      headers: {},
      rows: [],
      searchFields: []
    };
    
  }

  componentDidMount() {
    axios.get('http://localhost/api/list.php')
    .then( response => {
      this.setState({headers: response.data.data.headers[0], rows: response.data.data.rows});
    });
  }

  render (){
    return (
      <div className="App">
        <Container>
          <Row>
            <GridComponent dataSource={this.state.rows} toolbar={["Search"]} allowSorting={true}>
              <ColumnsDirective>
                {
                  Object.keys(this.state.headers).map((key) => {
                    let obj = this.state.headers[key];
                    if ( !obj.hidden ) {
                      return <ColumnDirective field={key} headerText={obj.title} />
                    } else {
                      return null;
                    }
                  }, this)
                  .keys()
                }
              </ColumnsDirective>
              <Inject services={[Sort, Toolbar]} />
            </GridComponent>
          </Row>
        </Container>
      </div>
    );
  }
}

export default List;
