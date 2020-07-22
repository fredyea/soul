const expres = require('express');
const router = expres.Router();

router.get('/', (req,res)=> {
    res.render('index',{
        title : 'ALDIA SOLUTIONS'
    });
})



router.get('/facturas', (req,res)=> {
    res.render('facturas');
})


router.post('/newfactura', (req,res,next)=> {
    const { documento } = req.body;
    const { nombres } = req.body;
    const { apellidos } = req.body;
    const { direccion } = req.body;
    const { email } = req.body;
    const { celular } = req.body;
    const { factura } = req.body;
    const  valor   = parseInt(req.body.valor);
    const  iva  = parseInt(req.body.iva);
    const { concepto } = req.body;

    /// Reemplazar por una puta funcion que haga esa vaina
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    } 
    var fecha_expedicion = dd+'/'+mm+'/'+yyyy;
    ///
    
    fetch('http://api.dataico.com/direct/dataico_api/v2/invoices',{
        method: 'POST',
        headers:{
                'Content-Type': 'application/json',
                'auth-token': '9e9c9d0a9e3856349abdf23d83a286c6',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':  'POST, GET, OPTIONS, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-' 

                 },
        body: JSON.stringify({
                                "actions": {
                                            "send_dian": false
                                        },
                                "invoice": {
                                            "env": "PRUEBAS",
                                            "dataico_account_id": "cb368cef-d25d-405d-a8b0-e3f611a18ffa",
                                            "issue_date": fecha_expedicion,
                                            "payment_date": fecha_expedicion,
                                            "order_reference": factura,
                                            "invoice_type_code": "FACTURA_VENTA",
                                            "payment_means_type": "DEBITO",
                                            "payment_means": "DEBIT_AHORRO",
                                            "notes": [
                                                "ptueba"
                                                ],
                                            "customer": {
                                                "email": email,
                                                "phone": celular,
                                                "party_identification":  documento,
                                                "party_type": "PERSONA_JURIDICA",
                                                "tax_level_code": "COMUN",
                                                "regimen": "ORDINARIO",
                                                "department": "ANTIOQUIA",
                                                "city": "MEDELLIN",
                                                "address_line": direccion,
                                                "country_code": "CO",
                                                "company_name": nombres,
                                                "first_name": nombres,
                                                "family_name": apellidos
                                                        },
                                            "items": [
                                                            {
                                                                "sku": "MANTENIMIENTO",
                                                                "description": concepto,
                                                                "quantity": 1,
                                                                "price": valor,
                                                                "taxes": [
                                                                                {
                                                                                "tax_rate": iva,
                                                                                "tax_category": "IVA"
                                                                                }
                                                                            ]
                                                            }
                                                        ]
                                            }
                                            
                             })
    })
    .then( response => response.json())
    .then( json => {
            console.log(json)
            if(json === 'error'){
                respuesta.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Error al Llenar los Campos
                </div>
                `
            }else{
                respuesta.innerHTML = `
                <div class="alert alert-primary" role="alert">
                    Factura Generada Correctamente
                </div>
                `
            }
        })
        res.redirect('facturas');
    })



module.exports = router;