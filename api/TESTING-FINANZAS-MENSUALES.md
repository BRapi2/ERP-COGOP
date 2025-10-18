# Testing reportes-finanzas-mensuales locally

This file contains instructions and curl examples to test the `reportes-finanzas-mensuales` endpoints locally using Azure Functions Core Tools.

Prerequisites
- Node 20 (project expects Node 20.x)
- Azure Functions Core Tools v4 installed (`func`)
- MySQL accessible if you want to persist data (check `src/db.ts`) — otherwise requests may fail when repository tries to access DB.

Start the API locally
1. From `api/` run:

```bash
npm run elvis
# This runs the build and then starts the Functions host (func start)
```

2. By default the host will be available at: `http://localhost:7071`

Endpoints to test
- GET  /api/v1/reportes-finanzas-mensuales/lista
- POST /api/v1/reportes-finanzas-mensuales/guardar
- GET  /api/v1/reportes-finanzas-mensuales/{id}

Curl examples

List (GET):
```bash
curl -i http://localhost:7071/api/v1/reportes-finanzas-mensuales/lista
```

Get by id (GET):
```bash
curl -i http://localhost:7071/api/v1/reportes-finanzas-mensuales/1
```

Create (POST):
```bash
curl -i -X POST http://localhost:7071/api/v1/reportes-finanzas-mensuales/guardar \
  -H "Content-Type: application/json" \
  -d '{
    "fecha":"2025-10-01",
    "ingresos": 1500.50,
    "egresos": 500.25,
    "saldo_final": 1000.25,
    "responsable": "Juan Perez",
    "tipo_ingreso": "Donacion",
    "tipo_egreso": "Logistica",
    "metodo_pago": "Efectivo",
    "donaciones": 200.00,
    "gastos_actividad": 300.00,
    "observaciones": "Ejemplo",
    "comentarios": "Prueba API"
  }'
```

Notes
- If your DB credentials are stored in environment variables, make sure to set them before running.
- If you prefer VS Code: open the `api` folder and use the Azure Functions extension to run the Functions host and debug the handlers.

If you want, I can also open a Pull Request with these docs and a short description referencing the new module. Tell me if you want the PR created now.
