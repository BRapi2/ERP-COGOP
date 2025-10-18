import { validateBodyMiddleware } from "../middlewares/validation.middleware";
import { createAuthHandler } from "../utils/protectedRouteHandler";
import { ReportController } from "./Report.controller";
import { ReportDto } from "./ReportDto";

// --- Reporte general (por tipo de periodo, mensual, trimestral, etc.) ---
export const generateReport = createAuthHandler(
    async (req) => {
        const dto = req.validatedBody as ReportDto;
        const pdf = await new ReportController().generate(dto);

        return {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": "inline; filename=report.pdf",
            },
            body: pdf,
        };
    },
    {
        validateFn: (req) => validateBodyMiddleware(ReportDto, req),
    }
);
