import Card from "../common/Card";

const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    iconClassName = "",
}) => {
    return (
        <Card className="relative overflow-hidden">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <p className="mt-3 text-3xl font-bold text-slate-900">
                        {value}
                    </p>

                    {subtitle && (
                        <p className="mt-2 text-sm text-slate-500">
                            {subtitle}
                        </p>
                    )}
                </div>

                {icon && (
                    <div
                        className={`
                            flex
                            items-center
                            justify-center
                            w-12
                            h-12
                            rounded-xl
                            bg-slate-100
                            ${iconClassName}
                        `}
                    >
                        {icon}
                    </div>
                )}
            </div>
        </Card>
    );
};

export default StatCard;