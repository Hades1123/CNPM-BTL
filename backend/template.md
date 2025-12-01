src/
├── app.module.ts
├── main.ts
├── common/
│ ├── pipes/
│ │ └── validation.pipe.ts
│ ├── decorators/
│ │ └── current-user.decorator.ts
│ └── filters/
│ └── http-exception.filter.ts
├── config/
│ ├── configuration.ts
│ └── validation-schema.ts
├── core/
│ ├── auth/
│ │ ├── auth.module.ts
│ │ ├── auth.service.ts
│ │ └── jwt.strategy.ts
│ └── database/
│ └── database.module.ts
├── modules/
│ ├── user/
│ │ ├── user.module.ts
│ │ ├── user.controller.ts
│ │ ├── user.service.ts
│ │ ├── entities/
│ │ │ └── user.entity.ts
│ │ └── dto/
│ │ └── create-user.dto.ts
│ ├── product/
│ │ ├── product.module.ts
│ │ ├── product.controller.ts
│ │ ├── product.service.ts
│ │ └── entities/
│ │ └── product.entity.ts
│ └── order/
│ ├── order.module.ts
│ ├── order.controller.ts
│ └── order.service.ts
└── shared/
└── utils/
└── date.utils.ts
