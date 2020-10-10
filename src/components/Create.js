import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost/api/submit_form.php')
    .then( response => {
      alert("Success");
      console.log(response);
    }).catch(error => {
      alert("Error:" + error);
    });
  }

  componentDidMount() {
    axios.get('http://localhost/api/get_form.php')
    .then( response => {
      this.setState({data: response.data.data.fields[0]});
    });
  }

  render (){
    return (
      <div className="App">
        <Container>
          <Row>
            <Col>
              <h1>Create/Update Form</h1>
              <Form>
                {
                  Object.keys(this.state.data).map((key) => {
                    let obj = this.state.data[key];
                    console.log(this.state.data);
                    if ( obj.type === "textarea") {
                      return <Form.Control
                        key={obj.title}
                        as={obj.type}
                        placeholder={obj.title}
                        id={obj.html_attr.id}
                        className={obj.html_attr.class}
                        required={obj.required} />
                    } else if (obj.type === "radio" ) {
                      return (       
                        obj.options.map((el,i) => {
                          return (<Form.Group key={obj.html_attr.id} id={obj.html_attr.id} Nameclass={obj.html_attr.class}>
                            <Form.Check inline
                                  id={`${obj.title}-1`}
                                  name={`${obj.title}-1`}
                                  key={obj.key}
                                  type={obj.type}
                                  label={el.label} />
                          </Form.Group>)
                        })             
                      );
                    } else if (obj.type === "select" ) {
                      
                      return (
                        <Form.Control
                          key={obj.title}
                          as={obj.type}
                          placeholder={obj.title}
                          id={obj.html_attr.id}
                          className={obj.html_attr.class}
                          required={obj.required}>
                        {
                          obj.options.map((el,i) => {
                            return <option key={el.type}>{el.label}</option>
                          })
                        }
                        </Form.Control> 
                      )
                    } else {
                      return <Form.Control
                      key={obj.title}
                      type={obj.type}
                      placeholder={obj.title}
                      id={obj.html_attr.id}
                      className={obj.html_attr.class}
                      required={obj.required} />
                    }
                  }, this)
                }
                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Create;
