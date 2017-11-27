import React, { Component } from 'react';

export default class ReadOnlyForm extends Component {
    render() {
        let data = this.props.location.state.referrer;
        let fields = [];
        data.forEach(field => {
            let key = Object.keys(field)[0];
            if(key.includes('address') && !key.includes('different')){
                if(field[key].value.address.value){
                    let title = 'Aadress';
                    let address = field[key].value.address.value +', '+field[key].value.city.value;
                    address += field[key].value.alevik.value ? ', '+field[key].value.alevik.value : '';
                    fields.push({title: title, value: address});
                }
            }else{
                if(field[key].value && field[key].title){
                    fields.push({title: field[key].title, value: field[key].value});
                }
            }
        });
        let formContent = fields.map(field => {
            return (<div className="grid"><div className="col-5"><label>{field.title}</label></div><div className="col-7"><p>{field.value}</p></div></div>);
        });
        return (
            <div className="App form-container" key="App">
                <div className="grid-center">
                    <h1>Kontaktandmed</h1>
                </div>
                <div className="grid" key="form-container">
                    <div className="col">
                        {formContent}
                    </div>
                </div>
            </div>
        );
    }
}