#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Nautilus/Nautilus.csproj", "Nautilus/"]
RUN dotnet restore "Nautilus/Nautilus.csproj"
COPY . .
WORKDIR "/src/Nautilus"
RUN dotnet build "Nautilus.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Nautilus.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
ENV TZ="Europe/Rome"
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Nautilus.dll"]