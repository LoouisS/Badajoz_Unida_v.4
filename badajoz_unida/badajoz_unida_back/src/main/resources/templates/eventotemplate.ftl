<html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                font-size: 12px;
                text-align: center;
            }
    
            .header {
                margin-bottom: 20px;
            }
    
            .image {
                margin-bottom: 10px;
            }
    
            .title {
                text-align: left;
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 10px;
            }
    
            .table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }
    
            .table th, .table td {
                border: 1px solid black;
                padding: 5px;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <img src=${img} alt="Logo" class="image">
            <h1>${nombreEvento}</h1>
            <p>${descripcionEvento}</p>
        </div>
        <div class="title">Lista de Usuarios:</div>
        <table class="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                <#list usuarios as usuario>
                    <tr>
                        <td>${usuario.nombre}</td>
                        <td>${usuario.email}</td>
                    </tr>
                </#list>
            </tbody>
        </table>
    </body>
</html>