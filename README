# DynamoDB Updates - Configuración

## Descripción

Este proyecto es una aplicación TypeScript que procesa datos de clientes y actualiza portfolios en DynamoDB. La aplicación está diseñada para procesar lotes de clientes y actualizar sus portfolios asociados con información del cliente.

## Requisitos Previos

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- **AWS CLI** configurado con credenciales apropiadas
- Acceso a DynamoDB con permisos de lectura y escritura

## Instalación

1. **Clonar el repositorio** (si aplica):

   ```bash
   git clone <repository-url>
   cd dynamo-updates
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

## Configuración del Entorno

### Variables de Entorno

El proyecto utiliza las siguientes variables de entorno:

| Variable | Descripción           | Valores Permitidos               | Requerido |
| -------- | --------------------- | -------------------------------- | --------- |
| `ENV`    | Ambiente de ejecución | `Dev`, `Prod`, `Sandbox`, `Test` | ✅        |

## Estructura del Proyecto

```
dynamo-updates/
├── src/
│   ├── config/
│   │   └── index.ts          # Configuración de variables de entorno
│   ├── repository/
│   │   ├── CustomerRepository.ts    # Operaciones con clientes
│   │   └── PortfolioRepository.ts   # Operaciones con portfolios
│   ├── utils/
│   │   └── customLogs.ts     # Utilidades de logging
│   └── index.ts              # Punto de entrada principal
├── package.json
├── tsconfig.json
└── README.md
```

### Ejecución del Script Principal

```bash
npm start
```

O ejecutar directamente con TypeScript:

```bash
npx ts-node src/index.ts
```

### Funcionalidad

El script principal (`src/index.ts`) realiza las siguientes operaciones:

1. **Procesamiento por Lotes**: Procesa clientes en lotes de 390 elementos
2. **Actualización de Portfolios**: Para cada cliente, busca su portfolio y lo actualiza con el `clientId`
3. **Logging**: Proporciona logs detallados del proceso
4. **Manejo de Errores**: Captura y registra errores sin detener el proceso
